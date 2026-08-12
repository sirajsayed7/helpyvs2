-- Adds split operating periods and breaks to existing Helpy projects.
-- Safe to run more than once.

alter table public.vendor_availability
  add column if not exists time_blocks jsonb;

update public.vendor_availability
set time_blocks = jsonb_build_array(
  jsonb_build_object(
    'start_time', to_char(start_time, 'HH24:MI'),
    'end_time', to_char(end_time, 'HH24:MI')
  )
)
where time_blocks is null;

comment on column public.vendor_availability.time_blocks is
  'Ordered operating periods for the day. Gaps between periods are vendor breaks.';
