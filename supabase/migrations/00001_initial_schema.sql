-- Momentum Planner — Initial Supabase Schema
-- Migrated from Dexie.js/IndexedDB local-first architecture
-- All tables include user_id with RLS so each user sees only their own data.

---------------------------------------------------------------------------
-- 1. LIFE AREAS
---------------------------------------------------------------------------
create table public.life_areas (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  color       text not null,
  icon        text not null,
  "order"     integer not null default 0,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.life_areas enable row level security;
create policy "Users manage own life_areas"
  on public.life_areas for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index life_areas_user_order on public.life_areas (user_id, "order");

---------------------------------------------------------------------------
-- 2. GOALS
---------------------------------------------------------------------------
create table public.goals (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  life_area_id  uuid references public.life_areas(id) on delete set null,
  title         text not null,
  description   text not null default '',
  type          text not null check (type in ('long-term', 'monthly', 'weekly')),
  target_date   date,
  status        text not null default 'active' check (status in ('active', 'completed', 'archived')),
  created_at    timestamptz not null default now()
);

alter table public.goals enable row level security;
create policy "Users manage own goals"
  on public.goals for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index goals_user_life_area on public.goals (user_id, life_area_id);
create index goals_user_status on public.goals (user_id, status);

---------------------------------------------------------------------------
-- 3. DAILY PLANS
-- schedule, tasks, review, mood stored as JSONB — matches the nested
-- TypeScript interfaces (ScheduleBlock[], Task[], DailyReview, Mood).
---------------------------------------------------------------------------
create table public.daily_plans (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  date             date not null,
  top_priorities   jsonb not null default '[]'::jsonb,
  schedule         jsonb not null default '[]'::jsonb,
  primary_tasks    jsonb not null default '[]'::jsonb,
  secondary_tasks  jsonb not null default '[]'::jsonb,
  notes            text not null default '',
  review           jsonb not null default '{"accomplishments":"","lessons":"","gratitude":""}'::jsonb,
  mood             jsonb not null default '{"score":0,"note":""}'::jsonb,
  created_at       timestamptz not null default now(),
  unique (user_id, date)
);

alter table public.daily_plans enable row level security;
create policy "Users manage own daily_plans"
  on public.daily_plans for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index daily_plans_user_date on public.daily_plans (user_id, date);

---------------------------------------------------------------------------
-- 4. WEEKLY PLANS
-- lifeAreaGoals stored as JSONB (Record<string, LifeAreaGoal[]>).
---------------------------------------------------------------------------
create table public.weekly_plans (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  week_start        date not null,
  last_week_review  jsonb not null default '{"wins":"","challenges":"","lessons":""}'::jsonb,
  top_priorities    jsonb not null default '[]'::jsonb,
  weekly_plan       jsonb not null default '[]'::jsonb,
  notes             text not null default '',
  life_area_goals   jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now(),
  unique (user_id, week_start)
);

alter table public.weekly_plans enable row level security;
create policy "Users manage own weekly_plans"
  on public.weekly_plans for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index weekly_plans_user_week on public.weekly_plans (user_id, week_start);

---------------------------------------------------------------------------
-- 5. MONTHLY PLANS
---------------------------------------------------------------------------
create table public.monthly_plans (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  month       integer not null check (month between 1 and 12),
  year        integer not null,
  goals       jsonb not null default '[]'::jsonb,
  notes       text not null default '',
  created_at  timestamptz not null default now(),
  unique (user_id, month, year)
);

alter table public.monthly_plans enable row level security;
create policy "Users manage own monthly_plans"
  on public.monthly_plans for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index monthly_plans_user_month_year on public.monthly_plans (user_id, month, year);

---------------------------------------------------------------------------
-- 6. EVENTS
---------------------------------------------------------------------------
create table public.events (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  title         text not null,
  date          date not null,
  start_time    text,
  end_time      text,
  life_area_id  uuid references public.life_areas(id) on delete set null,
  notes         text not null default '',
  created_at    timestamptz not null default now()
);

alter table public.events enable row level security;
create policy "Users manage own events"
  on public.events for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index events_user_date on public.events (user_id, date);

---------------------------------------------------------------------------
-- 7. HABITS
---------------------------------------------------------------------------
create table public.habits (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  name          text not null,
  description   text not null default '',
  type          text not null check (type in ('boolean', 'quantity', 'timed')),
  target        numeric,
  unit          text,
  schedule      jsonb not null default '{"type":"daily"}'::jsonb,
  life_area_id  uuid references public.life_areas(id) on delete set null,
  color         text not null default '',
  created_at    timestamptz not null default now()
);

alter table public.habits enable row level security;
create policy "Users manage own habits"
  on public.habits for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index habits_user on public.habits (user_id);

---------------------------------------------------------------------------
-- 8. HABIT COMPLETIONS
---------------------------------------------------------------------------
create table public.habit_completions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  habit_id    uuid not null references public.habits(id) on delete cascade,
  date        date not null,
  value       numeric not null default 0,
  timestamp   timestamptz not null default now(),
  unique (habit_id, date)
);

alter table public.habit_completions enable row level security;
create policy "Users manage own habit_completions"
  on public.habit_completions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index habit_completions_user_date on public.habit_completions (user_id, date);
create index habit_completions_habit_date on public.habit_completions (habit_id, date);

---------------------------------------------------------------------------
-- 9. USER DATA (profile / gamification)
-- One row per user. Stores XP, level, achievements, settings.
---------------------------------------------------------------------------
create table public.user_data (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null unique references auth.users(id) on delete cascade,
  xp              integer not null default 0,
  level           integer not null default 1,
  achievements    jsonb not null default '[]'::jsonb,
  streak_freezes  integer not null default 3,
  settings        jsonb not null default '{"theme":"dark","notifications":true,"weekStartsOn":1}'::jsonb,
  created_at      timestamptz not null default now()
);

alter table public.user_data enable row level security;
create policy "Users manage own user_data"
  on public.user_data for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

---------------------------------------------------------------------------
-- 10. AI CONVERSATIONS
---------------------------------------------------------------------------
create table public.ai_conversations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  messages    jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

alter table public.ai_conversations enable row level security;
create policy "Users manage own ai_conversations"
  on public.ai_conversations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index ai_conversations_user on public.ai_conversations (user_id, created_at desc);

---------------------------------------------------------------------------
-- 11. AUTO-CREATE USER DATA ON SIGNUP
-- Trigger inserts a user_data row when a new user signs up.
---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_data (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

---------------------------------------------------------------------------
-- 12. SEED DEFAULT LIFE AREAS ON SIGNUP
---------------------------------------------------------------------------
create or replace function public.seed_default_life_areas()
returns trigger as $$
begin
  insert into public.life_areas (user_id, name, color, icon, "order", is_default) values
    (new.id, 'Physical Health', 'emerald',  'Heart',       0, true),
    (new.id, 'Personal Growth', 'blue',     'Brain',       1, true),
    (new.id, 'Family',          'pink',     'Home',        2, true),
    (new.id, 'Work & Career',   'amber',    'Briefcase',   3, true),
    (new.id, 'Social',          'purple',   'Users',       4, true),
    (new.id, 'Others',          'slate',    'MoreHorizontal', 5, true);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created_seed_areas
  after insert on auth.users
  for each row execute function public.seed_default_life_areas();
