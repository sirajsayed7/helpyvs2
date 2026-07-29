-- Run this once in the Supabase SQL Editor for an existing Helpy project.
-- It is safe to run again.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users(id) on delete cascade,
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  service_id uuid references public.services(id) on delete set null,
  customer_name text not null default 'Helpy Customer',
  customer_email text,
  service_name text not null,
  scheduled_date date not null,
  scheduled_time text not null,
  address text not null default 'Doha, Qatar',
  notes text not null default '',
  price numeric(10,2) not null check (price >= 0),
  currency text not null default 'QR',
  status text not null default 'pending' check (status in ('pending','in_progress','completed','cancelled')),
  progress_step smallint not null default -1 check (progress_step between -1 and 4),
  payment_status text not null default 'paid' check (payment_status in ('pending','paid','refunded')),
  completion_note text,
  accepted_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.booking_evidence (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  file_name text not null,
  file_type text not null default 'file',
  file_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists bookings_customer_id_idx on public.bookings(customer_id);
create index if not exists bookings_vendor_id_idx on public.bookings(vendor_id);
create index if not exists bookings_status_idx on public.bookings(status);
create index if not exists booking_evidence_booking_id_idx on public.booking_evidence(booking_id);

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at before update on public.bookings for each row execute function public.set_updated_at();

alter table public.bookings enable row level security;
alter table public.booking_evidence enable row level security;

drop policy if exists "customers create own bookings" on public.bookings;
drop policy if exists "customers read own bookings" on public.bookings;
drop policy if exists "customers update own bookings" on public.bookings;
drop policy if exists "vendors read assigned bookings" on public.bookings;
drop policy if exists "vendors update assigned bookings" on public.bookings;
create policy "customers create own bookings" on public.bookings for insert with check (auth.uid() = customer_id);
create policy "customers read own bookings" on public.bookings for select using (auth.uid() = customer_id);
create policy "customers update own bookings" on public.bookings for update using (auth.uid() = customer_id) with check (auth.uid() = customer_id);
create policy "vendors read assigned bookings" on public.bookings for select using (auth.uid() = vendor_id);
create policy "vendors update assigned bookings" on public.bookings for update using (auth.uid() = vendor_id) with check (auth.uid() = vendor_id);

drop policy if exists "customers read booking evidence" on public.booking_evidence;
drop policy if exists "vendors read own booking evidence" on public.booking_evidence;
drop policy if exists "vendors create own booking evidence" on public.booking_evidence;
drop policy if exists "vendors delete own booking evidence" on public.booking_evidence;
create policy "customers read booking evidence" on public.booking_evidence for select using (
  exists (select 1 from public.bookings where bookings.id = booking_evidence.booking_id and bookings.customer_id = auth.uid())
);
create policy "vendors read own booking evidence" on public.booking_evidence for select using (auth.uid() = vendor_id);
create policy "vendors create own booking evidence" on public.booking_evidence for insert with check (
  auth.uid() = vendor_id and exists (select 1 from public.bookings where bookings.id = booking_evidence.booking_id and bookings.vendor_id = auth.uid())
);
create policy "vendors delete own booking evidence" on public.booking_evidence for delete using (auth.uid() = vendor_id);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'bookings'
  ) then
    alter publication supabase_realtime add table public.bookings;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'booking_evidence'
  ) then
    alter publication supabase_realtime add table public.booking_evidence;
  end if;
end;
$$;
