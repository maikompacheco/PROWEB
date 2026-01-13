# PROWEB Sports - Configuração do Supabase

## 📋 Visão Geral

Este documento descreve como configurar o Supabase para o PROWEB Sports e o schema do banco de dados.

## 🚀 Primeiros Passos

### 1. Criar Projeto Supabase

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Clique em "New Project"
3. Preencha os dados:
   - **Project name**: PROWEB Sports
   - **Database password**: (gere uma senha forte)
   - **Region**: (escolha a mais próxima)
4. Aguarde a criação do projeto (~2 minutos)

### 2. Obter Credenciais

1. Na página do projeto, acesse "Settings" → "API"
2. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`
3. Atualize `.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 📊 Schema do Banco de Dados

### Tabelas Necessárias

Execute os SQL scripts abaixo no **SQL Editor** do Supabase:

#### 1. Tabela de Usuários (profiles)

```sql
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email text UNIQUE,
  name text,
  role text DEFAULT 'coach', -- admin, coordinator, coach, athlete
  school text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);
```

#### 2. Tabela de Categorias

```sql
CREATE TABLE public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  min_age integer NOT NULL,
  max_age integer NOT NULL,
  description text,
  color text DEFAULT 'from-blue-500 to-cyan-500',
  icon text DEFAULT '⚽',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON public.categories
  FOR SELECT
  USING (true);
```

#### 3. Tabela de Equipes

```sql
CREATE TABLE public.teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  school text,
  category_id uuid REFERENCES public.categories (id) ON DELETE SET NULL,
  coach_id uuid REFERENCES public.profiles (id) ON DELETE SET NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teams are viewable by everyone"
  ON public.teams
  FOR SELECT
  USING (true);
```

#### 4. Tabela de Atletas

```sql
CREATE TABLE public.athletes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  age integer,
  school text,
  position text,
  secondary_position text,
  dominant_foot text DEFAULT 'direito', -- direito, esquerdo, ambidestro
  category_id uuid REFERENCES public.categories (id) ON DELETE SET NULL,
  team_id uuid REFERENCES public.teams (id) ON DELETE SET NULL,
  status text DEFAULT 'ativo', -- ativo, observação, destaque
  height numeric(5, 2), -- em cm
  weight numeric(5, 2), -- em kg
  birth_date date,
  
  -- Tracking
  last_seen timestamp with time zone,
  gps_lat numeric(10, 8),
  gps_lng numeric(11, 8),
  heart_rate integer,
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.athletes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes are viewable by everyone"
  ON public.athletes
  FOR SELECT
  USING (true);
```

#### 5. Tabela de Avaliações

```sql
CREATE TABLE public.evaluations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id uuid NOT NULL REFERENCES public.athletes (id) ON DELETE CASCADE,
  date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Technical
  passing numeric(2, 1), -- 0-10
  ball_control numeric(2, 1), -- 0-10
  finishing numeric(2, 1), -- 0-10
  
  -- General Scores
  tactical numeric(2, 1), -- 0-10
  physical numeric(2, 1), -- 0-10
  behavior numeric(2, 1), -- 0-10
  overall_score numeric(2, 1), -- 0-10
  
  comments text,
  evaluated_by uuid REFERENCES public.profiles (id) ON DELETE SET NULL,
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Evaluations are viewable by everyone"
  ON public.evaluations
  FOR SELECT
  USING (true);
```

#### 6. Tabela de Frequência

```sql
CREATE TABLE public.attendance (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id uuid NOT NULL REFERENCES public.athletes (id) ON DELETE CASCADE,
  training_id uuid REFERENCES public.trainings (id) ON DELETE SET NULL,
  date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  status text NOT NULL, -- present, absent_justified, absent_unjustified
  notes text,
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Attendance is viewable by everyone"
  ON public.attendance
  FOR SELECT
  USING (true);
```

#### 7. Tabela de Evolução

```sql
CREATE TABLE public.evolution_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id uuid NOT NULL REFERENCES public.athletes (id) ON DELETE CASCADE,
  date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  type text NOT NULL, -- physical, position_change, category_promotion, note, evaluation
  title text NOT NULL,
  description text,
  metadata jsonb,
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.evolution_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Evolution records are viewable by everyone"
  ON public.evolution_records
  FOR SELECT
  USING (true);
```

#### 8. Tabela de Treinos (para análises futuras)

```sql
CREATE TABLE public.trainings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid REFERENCES public.teams (id) ON DELETE CASCADE,
  date timestamp with time zone NOT NULL,
  title text NOT NULL,
  description text,
  focus_areas text[], -- Array de áreas de foco
  intensity text, -- light, moderate, high
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trainings are viewable by everyone"
  ON public.trainings
  FOR SELECT
  USING (true);
```

## 🔐 Configurar Autenticação

### 1. Email/Password

1. Acesse "Authentication" → "Providers"
2. Ative "Email"
3. Configure as opções conforme necessário

### 2. Row Level Security (RLS)

As políticas básicas já foram criadas acima.

Para produção, implemente políticas mais restritivas:

```sql
-- Exemplo: Apenas coaches podem ver atletas da sua escola
CREATE POLICY "Coaches see athletes from their school"
  ON public.athletes
  FOR SELECT
  USING (
    school = (
      SELECT school FROM public.profiles WHERE id = auth.uid()
    )
  );
```

## 📦 Instalar Supabase Client

```bash
npm install @supabase/supabase-js
```

## 🧪 Testar a Conexão

```typescript
import { supabase } from './config/supabase'

// Teste básico
const { data, error } = await supabase
  .from('categories')
  .select('*')

console.log(data, error)
```

## 📝 Próximas Etapas

1. ✅ Criar tabelas no Supabase
2. ✅ Configurar RLS policies
3. ✅ Obter credenciais
4. ✅ Atualizar `.env.local`
5. 🔲 Conectar UI aos services
6. 🔲 Implementar autenticação
7. 🔲 Popular dados iniciais (categorias padrão)

## 🆘 Troubleshooting

### "Não conseguo conectar"
- Verifique se as credenciais estão corretas em `.env.local`
- Verifique se o Supabase está rodando (não bloqueado)
- Limpe o cache do navegador

### "Erro de RLS"
- Verifique se as políticas estão corretas
- Teste com RLS desativada (apenas desenvolvimento!)

### "Dados não aparecem"
- Verifique se as tabelas foram criadas
- Verifique se os dados foram inseridos
- Verifique no SQL Editor do Supabase

---

**Última atualização**: 12 de janeiro de 2026
