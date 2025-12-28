-- Seed emergency contacts data
insert into public.emergency_contacts (service_name, phone_number, email, availability, city, state) values
  ('Police Emergency', '911', 'police@emergency.gov', '24/7', 'All Cities', 'All States'),
  ('Fire Department', '911', 'fire@emergency.gov', '24/7', 'All Cities', 'All States'),
  ('Medical Emergency', '911', 'medical@emergency.gov', '24/7', 'All Cities', 'All States'),
  ('Poison Control', '1-800-222-1222', 'poison@control.org', '24/7', 'All Cities', 'All States'),
  ('National Suicide Prevention', '988', 'help@988lifeline.org', '24/7', 'All Cities', 'All States'),
  ('Disaster Assistance', '1-800-621-3362', 'disaster@fema.gov', '24/7', 'All Cities', 'All States'),
  ('Animal Control', '311', 'animal@control.gov', 'Mon-Fri 8am-5pm', 'All Cities', 'All States'),
  ('Public Works', '311', 'public.works@city.gov', 'Mon-Fri 7am-6pm', 'All Cities', 'All States')
on conflict do nothing;
