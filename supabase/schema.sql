-- ============================================================
-- users 테이블: auth.users와 자동 연동
-- Supabase Dashboard > SQL Editor에서 실행
-- ============================================================

-- 1. users 테이블 생성
create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  provider text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. RLS 활성화
alter table public.users enable row level security;

-- 3. 본인 데이터만 조회 가능
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

-- 4. 본인 데이터만 수정 가능
create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- 5. 신규 가입 시 자동으로 users 테이블에 삽입하는 함수
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, avatar_url, provider)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_app_meta_data->>'provider'
  );
  return new;
end;
$$;

-- 6. auth.users에 insert 발생 시 트리거 실행
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
