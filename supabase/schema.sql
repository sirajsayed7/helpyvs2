create extension if not exists "pgcrypto";

create table if not exists public.vendors (
  id uuid primary key references auth.users(id) on delete cascade,
  business_name text not null,
  category text not null default 'Home Services',
  description text not null default '',
  logo_url text,
  hero_image_url text,
  rating numeric(2,1) not null default 5.0,
  review_count integer not null default 0,
  distance_label text not null default 'Doha',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  name text not null,
  description text not null default '',
  category text not null,
  price numeric(10,2) not null check (price >= 0),
  duration text not null,
  image_url text,
  is_active boolean not null default true,
  bookings_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(vendor_id, name)
);

create table if not exists public.vendor_availability (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  enabled boolean not null default true,
  start_time time not null,
  end_time time not null,
  unique(vendor_id, day_of_week)
);

create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  service_id uuid references public.services(id) on delete set null,
  kind text not null check (kind in ('service','event','banner')),
  title text not null,
  description text not null default '',
  offer_type text not null default 'fixed' check (offer_type in ('discount','fixed')),
  discount_percent numeric(5,2),
  offer_price numeric(10,2),
  cta_label text not null default 'Book Now',
  image_url text,
  design_brief text,
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null,
  status text not null default 'draft' check (status in ('draft','pending_review','active','rejected','expired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists vendors_set_updated_at on public.vendors;
create trigger vendors_set_updated_at before update on public.vendors for each row execute function public.set_updated_at();
drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at before update on public.services for each row execute function public.set_updated_at();
drop trigger if exists promotions_set_updated_at on public.promotions;
create trigger promotions_set_updated_at before update on public.promotions for each row execute function public.set_updated_at();
drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at before update on public.bookings for each row execute function public.set_updated_at();

alter table public.vendors enable row level security;
alter table public.services enable row level security;
alter table public.vendor_availability enable row level security;
alter table public.promotions enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_evidence enable row level security;

drop policy if exists "public reads active vendors" on public.vendors;
drop policy if exists "vendors read own profile" on public.vendors;
drop policy if exists "vendors create own profile" on public.vendors;
drop policy if exists "vendors update own profile" on public.vendors;
create policy "public reads active vendors" on public.vendors for select using (is_active);
create policy "vendors read own profile" on public.vendors for select using (auth.uid() = id);
create policy "vendors create own profile" on public.vendors for insert with check (auth.uid() = id);
create policy "vendors update own profile" on public.vendors for update using (auth.uid() = id);

drop policy if exists "public reads active services" on public.services;
drop policy if exists "vendors read own services" on public.services;
drop policy if exists "vendors create own services" on public.services;
drop policy if exists "vendors update own services" on public.services;
drop policy if exists "vendors delete own services" on public.services;
create policy "public reads active services" on public.services for select using (is_active);
create policy "vendors read own services" on public.services for select using (auth.uid() = vendor_id);
create policy "vendors create own services" on public.services for insert with check (auth.uid() = vendor_id);
create policy "vendors update own services" on public.services for update using (auth.uid() = vendor_id);
create policy "vendors delete own services" on public.services for delete using (auth.uid() = vendor_id);

drop policy if exists "public reads availability" on public.vendor_availability;
drop policy if exists "vendors create own availability" on public.vendor_availability;
drop policy if exists "vendors update own availability" on public.vendor_availability;
drop policy if exists "vendors delete own availability" on public.vendor_availability;
create policy "public reads availability" on public.vendor_availability for select using (true);
create policy "vendors create own availability" on public.vendor_availability for insert with check (auth.uid() = vendor_id);
create policy "vendors update own availability" on public.vendor_availability for update using (auth.uid() = vendor_id);
create policy "vendors delete own availability" on public.vendor_availability for delete using (auth.uid() = vendor_id);

drop policy if exists "public reads active promotions" on public.promotions;
drop policy if exists "vendors read own promotions" on public.promotions;
drop policy if exists "vendors create own promotions" on public.promotions;
drop policy if exists "vendors update own promotions" on public.promotions;
drop policy if exists "vendors delete own promotions" on public.promotions;
create policy "public reads active promotions" on public.promotions for select using (status = 'active' and starts_at <= now() and ends_at > now());
create policy "vendors read own promotions" on public.promotions for select using (auth.uid() = vendor_id);
create policy "vendors create own promotions" on public.promotions for insert with check (auth.uid() = vendor_id);
create policy "vendors update own promotions" on public.promotions for update using (auth.uid() = vendor_id);
create policy "vendors delete own promotions" on public.promotions for delete using (auth.uid() = vendor_id);

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

insert into storage.buckets (id, name, public)
values ('marketplace-media', 'marketplace-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "public reads marketplace media" on storage.objects;
drop policy if exists "vendors upload marketplace media" on storage.objects;
drop policy if exists "vendors update marketplace media" on storage.objects;
drop policy if exists "vendors delete marketplace media" on storage.objects;
create policy "public reads marketplace media" on storage.objects for select using (bucket_id = 'marketplace-media');
create policy "vendors upload marketplace media" on storage.objects for insert to authenticated with check (bucket_id = 'marketplace-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "vendors update marketplace media" on storage.objects for update to authenticated using (bucket_id = 'marketplace-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "vendors delete marketplace media" on storage.objects for delete to authenticated using (bucket_id = 'marketplace-media' and (storage.foldername(name))[1] = auth.uid()::text);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'services'
  ) then
    alter publication supabase_realtime add table public.services;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'vendor_availability'
  ) then
    alter publication supabase_realtime add table public.vendor_availability;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'promotions'
  ) then
    alter publication supabase_realtime add table public.promotions;
  end if;

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
