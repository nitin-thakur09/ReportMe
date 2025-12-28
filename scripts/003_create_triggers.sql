-- Function to update the updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger for citizens table
drop trigger if exists citizens_updated_at on public.citizens;
create trigger citizens_updated_at
  before update on public.citizens
  for each row
  execute function public.handle_updated_at();

-- Trigger for departments table
drop trigger if exists departments_updated_at on public.departments;
create trigger departments_updated_at
  before update on public.departments
  for each row
  execute function public.handle_updated_at();

-- Trigger for incidents table
drop trigger if exists incidents_updated_at on public.incidents;
create trigger incidents_updated_at
  before update on public.incidents
  for each row
  execute function public.handle_updated_at();
