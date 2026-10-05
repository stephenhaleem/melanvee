create table if not exists public.site_copy (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_copy enable row level security;

create policy "Anyone can read website copy"
  on public.site_copy for select
  to anon, authenticated
  using (true);

create policy "Authenticated users can insert website copy"
  on public.site_copy for insert
  to authenticated
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update website copy"
  on public.site_copy for update
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
