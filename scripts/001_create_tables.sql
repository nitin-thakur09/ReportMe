-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create enum types for incident status and severity
create type incident_status as enum ('pending', 'acknowledged', 'in_progress', 'resolved', 'closed');
create type incident_severity as enum ('low', 'medium', 'high', 'critical');
create type user_role as enum ('citizen', 'department');

-- Citizens table (extends auth.users)
create table if not exists public.citizens (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone_number text not null,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  id_number text unique not null,
  id_verified boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Departments table (extends auth.users)
create table if not exists public.departments (
  id uuid primary key references auth.users(id) on delete cascade,
  department_name text not null,
  department_type text not null, -- e.g., 'police', 'fire', 'medical', 'public_works'
  contact_email text not null,
  contact_phone text not null,
  address text not null,
  city text not null,
  state text not null,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Incidents table
create table if not exists public.incidents (
  id uuid primary key default uuid_generate_v4(),
  citizen_id uuid references public.citizens(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null, -- 'crime', 'fire', 'medical', 'infrastructure', 'environmental'
  severity incident_severity default 'medium',
  status incident_status default 'pending',
  location_address text not null,
  location_city text not null,
  location_state text not null,
  location_coordinates jsonb, -- {lat: number, lng: number}
  media_urls text[], -- Array of image/video URLs
  assigned_department_id uuid references public.departments(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Incident updates/comments table
create table if not exists public.incident_updates (
  id uuid primary key default uuid_generate_v4(),
  incident_id uuid references public.incidents(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  user_type user_role not null,
  message text not null,
  status_change incident_status,
  created_at timestamp with time zone default now()
);

-- Emergency contacts table
create table if not exists public.emergency_contacts (
  id uuid primary key default uuid_generate_v4(),
  service_name text not null, -- 'Police', 'Fire', 'Ambulance', etc.
  phone_number text not null,
  email text,
  availability text default '24/7',
  city text,
  state text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Create indexes for better query performance
create index if not exists idx_incidents_citizen_id on public.incidents(citizen_id);
create index if not exists idx_incidents_assigned_dept on public.incidents(assigned_department_id);
create index if not exists idx_incidents_status on public.incidents(status);
create index if not exists idx_incidents_created_at on public.incidents(created_at desc);
create index if not exists idx_incident_updates_incident_id on public.incident_updates(incident_id);

-- Enable Row Level Security
alter table public.citizens enable row level security;
alter table public.departments enable row level security;
alter table public.incidents enable row level security;
alter table public.incident_updates enable row level security;
alter table public.emergency_contacts enable row level security;

-- RLS Policies for Citizens
create policy "Citizens can view their own profile"
  on public.citizens for select
  using (auth.uid() = id);

create policy "Citizens can update their own profile"
  on public.citizens for update
  using (auth.uid() = id);

create policy "Citizens can insert their own profile"
  on public.citizens for insert
  with check (auth.uid() = id);

-- RLS Policies for Departments
create policy "Departments can view their own profile"
  on public.departments for select
  using (auth.uid() = id);

create policy "Departments can update their own profile"
  on public.departments for update
  using (auth.uid() = id);

create policy "Departments can insert their own profile"
  on public.departments for insert
  with check (auth.uid() = id);

-- RLS Policies for Incidents
create policy "Citizens can view their own incidents"
  on public.incidents for select
  using (auth.uid() = citizen_id);

create policy "Departments can view assigned incidents"
  on public.incidents for select
  using (auth.uid() = assigned_department_id);

create policy "Citizens can insert their own incidents"
  on public.incidents for insert
  with check (auth.uid() = citizen_id);

create policy "Departments can update assigned incidents"
  on public.incidents for update
  using (auth.uid() = assigned_department_id);

-- RLS Policies for Incident Updates
create policy "Users can view updates for their incidents"
  on public.incident_updates for select
  using (
    exists (
      select 1 from public.incidents
      where incidents.id = incident_updates.incident_id
      and (incidents.citizen_id = auth.uid() or incidents.assigned_department_id = auth.uid())
    )
  );

create policy "Users can insert updates for their incidents"
  on public.incident_updates for insert
  with check (
    auth.uid() = user_id and
    exists (
      select 1 from public.incidents
      where incidents.id = incident_updates.incident_id
      and (incidents.citizen_id = auth.uid() or incidents.assigned_department_id = auth.uid())
    )
  );

-- RLS Policies for Emergency Contacts (public read access)
create policy "Anyone can view active emergency contacts"
  on public.emergency_contacts for select
  using (is_active = true);
