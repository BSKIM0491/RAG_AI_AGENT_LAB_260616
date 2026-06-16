-- Enable pgvector
create extension if not exists vector;

-- Users
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  created_at timestamptz default now()
);

-- Stocks
create table stocks (
  id uuid primary key default gen_random_uuid(),
  stock_code text unique not null,
  stock_name text not null,
  market text not null default 'KR',
  sector text,
  theme text
);

-- Stock Prices
create table stock_prices (
  id uuid primary key default gen_random_uuid(),
  stock_code text not null references stocks(stock_code),
  date date not null,
  open numeric,
  high numeric,
  low numeric,
  close numeric,
  volume bigint,
  unique(stock_code, date)
);

-- Signals
create table signals (
  id uuid primary key default gen_random_uuid(),
  stock_code text not null,
  signal_type text not null check (signal_type in ('discovery', 'buy', 'sell')),
  signal_score integer,
  buy_zone text,
  sell_zone text,
  stop_loss text,
  reason text,
  created_at timestamptz default now()
);

-- News
create table news (
  id uuid primary key default gen_random_uuid(),
  stock_code text,
  title text not null,
  url text,
  summary text,
  sentiment text check (sentiment in ('pos', 'neg', 'neu')),
  published_at timestamptz,
  created_at timestamptz default now()
);

-- RAG Documents
create table rag_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source text,
  content text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- RAG Embeddings (pgvector)
create table rag_embeddings (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references rag_documents(id),
  chunk_text text not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz default now()
);

-- Vector similarity search function
create or replace function match_rag_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table(id uuid, chunk_text text, similarity float)
language sql stable
as $$
  select id, chunk_text, 1 - (embedding <=> query_embedding) as similarity
  from rag_embeddings
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

-- Agent Logs
create table agent_logs (
  id uuid primary key default gen_random_uuid(),
  agent_name text not null,
  task_type text,
  input jsonb,
  output jsonb,
  status text check (status in ('success', 'error', 'running')),
  created_at timestamptz default now()
);

-- Index for vector search
create index on rag_embeddings using ivfflat (embedding vector_cosine_ops) with (lists = 100);
