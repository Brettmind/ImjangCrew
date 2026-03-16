import { NextRequest, NextResponse } from 'next/server';
import { stripe, PLANS, type PlanId } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: NextRequest) {
  try {
    const { planId, userId, userEmail } = await req.json() as {
      planId: PlanId;
      userId: string;
      userEmail: string;
    };

    const plan = PLANS[planId];
    if (!plan || plan.id === 'free' || !plan.priceId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // 기존 Stripe customer 확인
    const { data: sub } = await getSupabaseAdmin()
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();

    let customerId = sub?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: { supabase_user_id: userId },
      });
      customerId = customer.id;
    }

    const origin = req.headers.get('origin') ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: `${origin}/dashboard/billing?success=true&plan=${planId}`,
      cancel_url: `${origin}/dashboard/billing?canceled=true`,
      metadata: { supabase_user_id: userId, plan_id: planId },
      subscription_data: {
        metadata: { supabase_user_id: userId, plan_id: planId },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      locale: 'auto',
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[stripe/checkout]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
