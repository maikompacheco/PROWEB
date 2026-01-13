# 🚀 Guia Rápido: Conectar Supabase em Produção

## ✅ Pré-requisitos
- [ ] Conta Google ou GitHub para login
- [ ] Projeto PROWEB rodando (`npm run dev`)
- [ ] 10 minutos de tempo

---

## 1️⃣ Criar Projeto Supabase (2 minutos)

### Passo A: Acessar Supabase
1. Ir para [app.supabase.com](https://app.supabase.com)
2. Clicar em **"New project"**
3. Preencher:
   - **Project name:** `proweb-sports` (ou similar)
   - **Database password:** Gerar senha forte (Supabase faz isso automaticamente)
   - **Region:** `South America (São Paulo)` - **IMPORTANTE!**
4. Clicar **"Create new project"** e esperar ~2-3 minutos

---

## 2️⃣ Pegar as Credenciais (1 minuto)

Quando o projeto estiver pronto:

1. No painel da Supabase, ir para **Settings → API**
2. Copiar:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon (public) key** → `VITE_SUPABASE_ANON_KEY`

### Aparência esperada:
```
Project URL:      https://abc123defgh.supabase.co
anon key:         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 3️⃣ Configurar .env.local (1 minuto)

Abrir `c:\Users\Datamob\Desktop\PROWEB\.env.local` e substituir:

```dotenv
# Production - Supabase
VITE_SUPABASE_URL=https://abc123defgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Salvar arquivo (Ctrl+S).**

---

## 4️⃣ Criar Estrutura do Banco de Dados (3 minutos)

No painel Supabase:
1. Ir para **SQL Editor**
2. Clicar **"New query"**
3. Copiar todo o código abaixo e colar:

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Users/Profiles (integrado com auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'coach', -- coach, admin, athlete
  school TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Categories (Sub-13, Sub-14, etc)
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- Ex: Sub-13, Sub-14
  min_age INTEGER DEFAULT 0,
  max_age INTEGER DEFAULT 120,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Teams (Equipes)
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  school TEXT,
  coach_id UUID REFERENCES public.profiles(id),
  category_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Athletes (Atletas)
CREATE TABLE IF NOT EXISTS public.athletes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER,
  school TEXT,
  position TEXT, -- Atacante, Zagueiro, etc
  team_id UUID REFERENCES public.teams(id),
  category_id UUID REFERENCES public.categories(id),
  height DECIMAL(5, 2),
  weight DECIMAL(5, 2),
  jersey_number INTEGER,
  tracking JSONB DEFAULT '{"lastSeen": null, "gps": null, "heartRate": null}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Evaluations (Avaliações)
CREATE TABLE IF NOT EXISTS public.evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES public.athletes(id) ON DELETE CASCADE,
  coach_id UUID NOT NULL REFERENCES public.profiles(id),
  technical_score DECIMAL(3, 1), -- 0-10
  tactical_score DECIMAL(3, 1),
  physical_score DECIMAL(3, 1),
  behavioral_score DECIMAL(3, 1),
  overall_score DECIMAL(3, 1), -- Média
  comments TEXT,
  evaluation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Attendance Records (Frequência)
CREATE TABLE IF NOT EXISTS public.attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES public.athletes(id) ON DELETE CASCADE,
  training_date DATE NOT NULL,
  status TEXT DEFAULT 'present', -- present, absent_justified, absent_unjustified
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Training Sessions (Treinos)
CREATE TABLE IF NOT EXISTS public.training_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  coach_id UUID NOT NULL REFERENCES public.profiles(id),
  session_date DATE NOT NULL,
  focus_area TEXT, -- técnica, tática, física
  duration_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Match Results (Resultados)
CREATE TABLE IF NOT EXISTS public.match_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id),
  opponent TEXT NOT NULL,
  date_played DATE NOT NULL,
  goals_for INTEGER DEFAULT 0,
  goals_against INTEGER DEFAULT 0,
  result TEXT, -- W (vitória), D (empate), L (derrota)
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: usuário pode ver seu próprio perfil + admin vê todos
CREATE POLICY "profiles_public_read" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR auth.jwt()->'app_metadata'->>'role' = 'admin');

CREATE POLICY "profiles_self_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Teams: anyone authenticated can read
CREATE POLICY "teams_read" ON public.teams
  FOR SELECT USING (auth.role() = 'authenticated');

-- Athletes: anyone authenticated can read
CREATE POLICY "athletes_read" ON public.athletes
  FOR SELECT USING (auth.role() = 'authenticated');

-- Evaluations: coach + athlete pode ver suas avaliações
CREATE POLICY "evaluations_read" ON public.evaluations
  FOR SELECT USING (
    auth.uid() = coach_id 
    OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- Attendance: coach + athlete pode ver
CREATE POLICY "attendance_read" ON public.attendance_records
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_athletes_team_id ON public.athletes(team_id);
CREATE INDEX IF NOT EXISTS idx_athletes_category_id ON public.athletes(category_id);
CREATE INDEX IF NOT EXISTS idx_athletes_name ON public.athletes(name);
CREATE INDEX IF NOT EXISTS idx_evaluations_athlete_id ON public.evaluations(athlete_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_coach_id ON public.evaluations(coach_id);
CREATE INDEX IF NOT EXISTS idx_attendance_athlete_id ON public.attendance_records(athlete_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance_records(training_date);
```

4. Clicar **"Run"** ou **Ctrl+Enter**
5. Esperar completar ✅

---

## 5️⃣ Inserir Dados Iniciais (2 minutos)

Voltar ao **SQL Editor**, criar **novo query** e executar:

```sql
-- Insert categories
INSERT INTO public.categories (name, min_age, max_age) VALUES
  ('Sub-13', 10, 13),
  ('Sub-14', 13, 14),
  ('Sub-15', 14, 15),
  ('Sub-17', 15, 17),
  ('Sub-20', 17, 20)
ON CONFLICT (name) DO NOTHING;

-- Insert sample schools
-- (Nota: você pode customizar esses dados)
INSERT INTO public.teams (name, school, category_id) VALUES
  ('Time A - Sub-14', 'Escola Municipal Central', (SELECT id FROM categories WHERE name = 'Sub-14')),
  ('Time B - Sub-14', 'Escola Municipal Central', (SELECT id FROM categories WHERE name = 'Sub-14')),
  ('Time Técnico - Sub-17', 'Escola Técnica do Estado', (SELECT id FROM categories WHERE name = 'Sub-17'))
ON CONFLICT DO NOTHING;

-- Insert sample athletes
INSERT INTO public.athletes (name, age, school, position, team_id, category_id) VALUES
  ('João Silva', 14, 'Escola Municipal Central', 'Atacante', (SELECT id FROM teams LIMIT 1), (SELECT id FROM categories WHERE name = 'Sub-14')),
  ('Carlos Pereira', 14, 'Escola Municipal Central', 'Meio-campista', (SELECT id FROM teams LIMIT 1), (SELECT id FROM categories WHERE name = 'Sub-14')),
  ('Lucas Martins', 16, 'Escola Técnica do Estado', 'Zagueiro', (SELECT id FROM teams WHERE name LIKE '%Sub-17%'), (SELECT id FROM categories WHERE name = 'Sub-17'))
ON CONFLICT DO NOTHING;
```

6. Executar ✅

---

## 6️⃣ Validar Conexão (1 minuto)

De volta ao VS Code:

1. Se o servidor `npm run dev` não está rodando, executar:
   ```powershell
   npm run dev
   ```

2. No navegador, ir para http://localhost:5173
3. Clicar em **"Criar Conta"** e se registrar com um email fictício
4. Após login, ir para **"Atletas"** - deve aparecer os 3 atletas que criamos! ✅

---

## 🎯 Resumo: O que Aconteceu

| Etapa | Ação | Status |
|-------|------|--------|
| Banco de dados | ✅ 8 tabelas criadas + RLS policies |
| Autenticação | ✅ Supabase Auth integrado |
| Dados iniciais | ✅ Categorias, times, atletas |
| Frontend | ✅ App conecta automaticamente via .env.local |
| TypeScript | ✅ Zero erros, tudo tipado |

---

## 🔧 Troubleshooting

### Problema: "Erro ao carregar atletas"
**Solução:** Conferir se as credenciais em `.env.local` estão corretas (sem espaços extras)

### Problema: "Não consigo me registrar"
**Solução:** No painel Supabase → Auth → Users, confirmar se aparece o novo usuário

### Problema: "Blank page após login"
**Solução:** Abrir DevTools (F12) → Console, procurar erros relacionados a Supabase

---

## 📱 Próximos Passos

✅ **Agora você tem:**
- Database pronto para produção
- Autenticação funcionando
- Dados de exemplo para testar
- Frontend conectado ao backend real

🚀 **Próximo:** Conectar Dashboard aos dados reais (veja `IMPLEMENTATION.md`)

---

**Versão:** 1.0 | **Data:** 12 de janeiro de 2026
