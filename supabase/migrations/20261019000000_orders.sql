create table if not exists public.orders (
  id uuid primary key,
  reference text not null unique,
  email text not null,
  phone text,
  full_name text not null,
  address text not null,
  state text not null,
  city text not null,
  postal_code text,
  notes text,
  delivery_method text not null default 'standard' check (delivery_method in ('standard', 'express')),
  subtotal_kobo bigint not null,
  shipping_kobo bigint not null default 0,
  total_kobo bigint not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'cancelled')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists public.order_items (
  id uuid primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  product_slug text not null,
  color text,
  quantity integer not null check (quantity > 0),
  unit_price_kobo bigint not null
);

create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists order_items_order_id_idx on public.order_items (order_id);
