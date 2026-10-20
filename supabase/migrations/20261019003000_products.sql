create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  category_path text[] not null default '{}',
  summary text not null,
  description text not null,
  price_kobo bigint not null check (price_kobo >= 0),
  images text[] not null default '{}',
  availability text not null default 'in_stock' check (availability in ('in_stock', 'on_request')),
  stock_count integer,
  sourcing_eta text,
  colors jsonb not null default '[]'::jsonb,
  features jsonb not null default '[]'::jsonb,
  specs jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_category_path_idx on public.products using gin (category_path);
