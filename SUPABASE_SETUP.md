# Helpy shared marketplace setup

The vendor and customer applications use the same Supabase project. The vendor app writes services, availability, promotions, and banner media; the customer app reads the published marketplace and subscribes to realtime changes.

## Activate live synchronization

1. Create one Supabase project.
2. In **Authentication → Providers → Anonymous**, enable anonymous sign-ins for the current prototype login flow.
3. Open the SQL editor and run [`supabase/schema.sql`](./supabase/schema.sql).
   - For a project created before split availability was added, also run [`supabase/availability_time_blocks.sql`](./supabase/availability_time_blocks.sql) once.
4. Copy `.env.example` to `.env.local` in both repositories.
5. Put the same project URL and anon key into both `.env.local` files:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

6. Restart both Vite development servers.

Never put a Supabase service-role key in either frontend. The anon key is safe to expose when the included row-level security policies are enabled.

## Publishing behavior

- Active vendor services appear in the customer All Services page and homepage Featured Services.
- Paused services disappear from customer-facing lists.
- Availability controls the customer-facing “Available today” state.
- Paid service offers and events are published immediately.
- Banner campaigns are stored as `pending_review`. After approval, an administrator changes their status to `active`; the customer homepage then receives the uploaded banner through realtime sync.

Example approval query:

```sql
update public.promotions
set status = 'active', updated_at = now()
where id = 'PROMOTION_ID' and kind = 'banner';
```

The current vendor prototype uses Supabase anonymous authentication so data remains scoped to one secure `auth.uid()`. Replace this with the production vendor OTP/session during the authentication phase without changing the marketplace tables.
