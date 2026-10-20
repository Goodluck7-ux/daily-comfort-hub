create table if not exists public.addresses (
  id uuid primary key,
  user_id text not null,
  label text not null default 'Home',
  recipient_name text not null,
  phone text not null,
  address text not null,
  state text not null,
  city text not null,
  postal_code text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.shopping_requests (
  id uuid primary key,
  user_id text,
  email text not null,
  item_name text not null,
  budget_kobo bigint,
  deadline text,
  reference_url text,
  details text,
  contact_method text not null default 'whatsapp' check (contact_method in ('whatsapp', 'email')),
  status text not null default 'submitted' check (status in ('submitted', 'sourcing', 'quote_sent', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists addresses_user_id_idx on public.addresses (user_id);
create index if not exists shopping_requests_user_id_idx on public.shopping_requests (user_id);
create index if not exists shopping_requests_email_idx on public.shopping_requests (email);
