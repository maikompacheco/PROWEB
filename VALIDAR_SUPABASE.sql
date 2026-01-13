-- Validador de Estrutura Supabase
-- Execute este script para verificar se as tabelas foram criadas corretamente
-- 1. Listar tabelas criadas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
-- 2. Verificar dados em cada tabela
SELECT COUNT(*) as total_categories
FROM public.categories;
SELECT COUNT(*) as total_teams
FROM public.teams;
SELECT COUNT(*) as total_athletes
FROM public.athletes;
SELECT COUNT(*) as total_evaluations
FROM public.evaluations;
SELECT COUNT(*) as total_attendance
FROM public.attendance_records;
-- 3. Listar atletas cadastrados
SELECT id,
    name,
    age,
    school,
    position,
    team_id
FROM public.athletes;
-- 4. Listar times
SELECT id,
    name,
    school
FROM public.teams;
-- 5. Verificar RLS policies
SELECT tablename,
    policyname,
    qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename,
    policyname;