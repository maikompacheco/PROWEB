
# 🗂️ ARQUITETURA BaseONE - Guia Completo

## 📱 Fluxo de Navegação do Projeto

```
┌─────────────────────────────────────────┐
│        Home / Login / Register           │ ← Entrada
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│          App.tsx (Router)                │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┼──────────┬─────────────┐
    ▼          ▼          ▼             ▼
┌────────┐ ┌──────┐ ┌──────────┐ ┌──────────┐
│Dashboard│ │Athletes│ │Teams│ │Coaches │
└────────┘ └──────┘ └──────────┘ └──────────┘
    │          │        │          │
    │          │        │          │
    ▼          ▼        ▼          ▼
Métricas   Gerenciar  Editar    Perfil &
Dinâmicas  Atletas    Equipes   Licenças
```

---

## 🏗️ Estrutura de Pastas

```
PROWEB/
├── src/
│   ├── pages/
│   │   ├── Dashboard.tsx         ✅ [REFATORADO FASE 1]
│   │   ├── Athletes.tsx          ✅ [REFATORADO]
│   │   ├── Teams.tsx             ✅ [REFATORADO FASE 1]
│   │   ├── Coaches.tsx           🔄 [BÁSICO]
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Home.tsx
│   │   ├── TeamDetail.tsx        📋 [FASE 2]
│   │   ├── UserProfile.tsx       📋 [FASE 2]
│   │   └── Settings.tsx          📋 [FASE 2]
│   │
│   ├── components/
│   │   ├── Básicos/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Alert.tsx
│   │   │   └── ConfirmDialog.tsx
│   │   │
│   │   ├── Compostos/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── UserProfileMenu.tsx ✅ [NOVO]
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── DashboardCard.tsx   ✅ [NOVO]
│   │   │   └── StatsCard.tsx
│   │   │
│   │   ├── Athletes/
│   │   │   ├── AthleteCard.tsx     ✅ [NOVO]
│   │   │   ├── AthleteFormModal.tsx ✅ [NOVO]
│   │   │   ├── OnlineOfflineBadge.tsx ✅ [NOVO]
│   │   │   └── AthleteProfile/
│   │   │
│   │   ├── Teams/
│   │   │   ├── TeamCard.tsx        ✅ [NOVO]
│   │   │   ├── TeamEditModal.tsx   ✅ [NOVO]
│   │   │   └── AthleteSelector.tsx 📋 [FASE 2]
│   │   │
│   │   └── Coaches/
│   │       ├── CoachCard.tsx       📋 [FASE 2]
│   │       └── CoachFormModal.tsx  📋 [FASE 2]
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── AppContext.tsx      (Contém addTeam, updateTeam, deleteTeam)
│   │   ├── CoachContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── AttendanceContext.tsx
│   │
│   ├── services/
│   │   ├── athleteService.ts
│   │   ├── teamService.ts
│   │   ├── coachService.ts
│   │   ├── evaluationService.ts
│   │   ├── attendanceService.ts
│   │   ├── categoryService.ts
│   │   └── insightsService.ts
│   │
│   ├── types/
│   │   └── index.ts            (Todas as interfaces)
│   │
│   ├── config/
│   │   └── supabase.ts
│   │
│   ├── App.tsx                 (Router principal)
│   ├── main.tsx
│   └── index.css               (Estilos globais + Tailwind)
│
├── PLANO_TRANSFORMACAO.md      📋 [Roadmap completo]
├── STATUS_PROJETO.md           📊 [Status atual]
├── FASE1_SUMARIO.md           ✅ [Resumo FASE 1]
├── vite.config.ts
├── tailwind.config.cjs
├── tsconfig.json
└── package.json
```

---

## 🔄 Fluxo de Dados (Context API)

```
┌──────────────────────────────────────────────────┐
│                 Providers (App.tsx)              │
│                                                  │
│  ├─ AuthProvider       (usuário logado)         │
│  ├─ ThemeProvider      (dark/light)             │
│  ├─ AppProvider        (atletas, equipes)       │
│  ├─ CoachProvider      (treinadores)            │
│  └─ PermissionProvider (permissões)             │
└───────────────┬────────────────────────────────┘
                │
    ┌───────────┴───────────┬──────────────┐
    │                       │              │
    ▼                       ▼              ▼
Pages          Components      Services
├─Dashboard     ├─AthleteCard  ├─athleteService
├─Athletes      ├─TeamCard     ├─teamService
├─Teams         ├─CoachCard    ├─coachService
└─Coaches       └─...          └─...

          useAuth()
          useApp()
          useTheme()
          useCoach()
```

---

## 📊 Tipos de Dados Principais

```typescript
// Athletes
Athlete {
  id: string
  name: string
  age?: number
  category?: string        // Sub-14, Sub-16, etc
  position?: string
  teamId?: string          // Referência à equipe
  status?: AthleteStatus   // ACTIVE, OBSERVATION, HIGHLIGHTED
  tracking?: {...}
  createdAt?: string
}

// Teams
Team {
  id: string
  name: string             // "Equipe A"
  category?: string        // "sub_14"
  players: Athlete[]       // Atletas da equipe
  coordinator?: string     // ID do treinador
  coaches?: string[]       // IDs dos coaches
  schedule?: {...}
  createdAt?: string
}

// Coaches
Coach {
  id: string
  name: string
  email: string
  role: CoachRole          // FIELD_COACH, etc
  teamsAssigned?: string[] // IDs das equipes
  licenses?: CoachLicense[]
  status: 'active' | 'inactive' | 'suspended'
  createdAt?: string
}
```

---

## ✅ Componentes por Categoria

### 🎨 Componentes Base (Reutilizáveis)
| Componente | Uso | Props Principais |
|-----------|-----|------------------|
| Button | Ações | variant, size, isLoading |
| Input | Formulários | label, error, placeholder |
| Card | Containers | fullHeight, className |
| Modal | Diálogos | isOpen, title, onClose |
| Badge | Labels | variant (primary, secondary, success) |
| Alert | Notificações | type (success, error, warning), message |

### 🎭 Componentes Compostos
| Componente | Uso | Status |
|-----------|-----|--------|
| Header | Navegação topo | ✅ Pronto |
| Sidebar | Menu lateral | ✅ Pronto |
| UserProfileMenu | Menu usuário | ✅ NOVO |
| ConfirmDialog | Confirmação | ✅ Pronto |

### 📊 Componentes Específicos por Página
| Componente | Página | Status |
|-----------|--------|--------|
| DashboardCard | Dashboard | ✅ NOVO |
| AthleteCard | Athletes | ✅ NOVO |
| AthleteFormModal | Athletes | ✅ NOVO |
| OnlineOfflineBadge | Athletes | ✅ NOVO |
| TeamCard | Teams | ✅ NOVO |
| TeamEditModal | Teams | ✅ NOVO |
| AthleteSelector | Teams (FASE 2) | 📋 PRÓXIMO |
| CoachCard | Coaches | 📋 PRÓXIMO |

---

## 🎯 Fluxo de Edição - Exemplo Equipe

```
User clica "Editar" em TeamCard
        ↓
TeamCard.tsx chama onEdit(team)
        ↓
Teams.tsx handleOpenForm(team)
        ↓
selectedTeam = team
isFormModalOpen = true
        ↓
TeamEditModal.tsx abre
        ↓
useEffect popula form com team data
        ↓
User edita campos (name, category, coordinator)
        ↓
User clica "Atualizar"
        ↓
handleSubmit() valida dados
        ↓
updateTeamInContext(id, data) [AppContext]
        ↓
setSuccess("Equipe atualizada com sucesso!")
        ↓
Modal fecha, selectedTeam limpa
```

---

## 🔐 Segurança e Validações

### Types
- ✅ TypeScript em 100%
- ✅ Enums para valores fixos (AthleteStatus, CoachRole, etc)
- ✅ Interfaces bem definidas

### Formulários
- ✅ Validação de campos obrigatórios
- ✅ Feedback visual de erros
- ✅ Confirmação antes de deletar

### State
- ✅ Context API com typed values
- ✅ useCallback para otimização
- ✅ Sem estado global desnecessário

---

## 🚀 Performance

| Feature | Implementado |
|---------|-------------|
| Code Splitting | ❌ (Próximo) |
| Lazy Loading | ❌ (Próximo) |
| Memoization | ✅ (useCallback) |
| Re-render Optimization | ✅ (React.memo pronto) |
| Asset Optimization | ✅ (Vite) |
| CSS Optimization | ✅ (TailwindCSS purged) |

---

## 📱 Responsividade

### Breakpoints (Tailwind)
- `sm`: ≥ 640px
- `md`: ≥ 768px
- `lg`: ≥ 1024px
- `xl`: ≥ 1280px

### Aplicado em
- ✅ Cards em grid (1 col → 2 cols → 3 cols)
- ✅ Botões full-width em mobile
- ✅ Texto responsivo (text-sm → text-lg)
- ✅ Padding responsivo (p-4 → p-8)

---

## 🎨 Sistema de Cores (TailwindCSS)

```
Primary   (Azul)     : bg-blue-500, text-blue-600
Secondary (Cinza)    : bg-slate-500, text-slate-600
Success   (Verde)    : bg-emerald-500, text-emerald-600
Warning   (Laranja)  : bg-amber-500, text-amber-600
Danger    (Vermelho) : bg-red-500, text-red-600
Accent    (Rosa)     : bg-accent-500, text-accent-600
```

---

## 🌙 Dark/Light Theme

**Implementação**:
- `data-theme` attribute no HTML
- Context: `ThemeContext.tsx`
- Hook: `useTheme()`

**Aplicado em**:
- ✅ Backgrounds
- ✅ Textos
- ✅ Bordas
- ✅ Cards
- ✅ Inputs
- ✅ Modals

---

## 📞 Como Adicionar Nova Feature

### 1️⃣ Criar Componente
```typescript
// src/components/MeuComponente.tsx
import Card from './Card'
import Button from './Button'

interface MeuComponenteProps {
  data: any
  onAction: () => void
}

export default function MeuComponente({ data, onAction }: MeuComponenteProps) {
  const { theme } = useTheme()
  return (
    <Card>
      {/* Seu código aqui */}
    </Card>
  )
}
```

### 2️⃣ Usar em Página
```typescript
// src/pages/MinhaPage.tsx
import MeuComponente from '../components/MeuComponente'

export default function MinhaPage() {
  return (
    <div>
      <MeuComponente data={data} onAction={handleAction} />
    </div>
  )
}
```

### 3️⃣ Adicionar no Router (App.tsx)
```typescript
<Route path="/minha-rota" element={<MinhaPage />} />
```

### 4️⃣ Commit
```bash
git add .
git commit -m "feat: Adicionar meu novo componente"
git push
```

---

## 🏁 Checklist de Qualidade

Antes de commitar, verificar:
- [ ] TypeScript sem erros (`npx tsc --noEmit`)
- [ ] Build funciona (`npm run build`)
- [ ] Dev server funciona (`npm run dev`)
- [ ] Componentes reutilizáveis
- [ ] Props bem tipadas
- [ ] Tratamento de erros
- [ ] Loading states
- [ ] Dark/Light theme testado
- [ ] Mobile responsivo testado
- [ ] Commit message clara

---

**Documento Criado**: 12 de Janeiro de 2026  
**Tech Lead**: BaseONE Sports  
**Status**: 🟢 Ativo
