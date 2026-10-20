create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  summary text not null,
  description text not null,
  category_path text[] not null default '{}',
  price_kobo integer not null check (price_kobo >= 0),
  images text[] not null default '{}',
  availability text not null default 'in_stock' check (availability in ('in_stock', 'on_request')),
  stock_count integer,
  sourcing_eta text,
  colors jsonb not null default '[]',
  features text[] not null default '{}',
  specs jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  guest_email text,
  status text not null default 'pending_payment',
  payment_reference text unique,
  currency text not null default 'NGN',
  subtotal_kobo integer not null,
  delivery_fee_kobo integer not null default 0,
  total_kobo integer not null,
  shipping_address jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price_kobo integer not null
);

create table if not exists public.shopping_requests (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  email text not null,
  phone text,
  request text not null,
  budget_kobo integer,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
