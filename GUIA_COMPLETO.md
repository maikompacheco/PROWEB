# 🎯 PROWEB Sports - Guia Completo (Atualizado Jan 2026)

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Iniciar servidor dev
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

Acesse **http://localhost:5173/** - app rodará em **http://localhost:5173/**

---

## 📱 Funcionalidades Principais

### 🏠 **Home Page**
- Hero section com CTA
- 3 benefits principais do app
- Stats & testimonials
- Login/Register CTAs

### 🔐 **Autenticação**
- Login com email + senha (demo: qualquer email, min 6 chars)
- Registro com validação
- Session gerenciada por AuthContext
- Theme toggle no Header

### 👥 **Gerenciamento de Atletas**
| Feature | Status | Detalhes |
|---------|--------|----------|
| Listar atletas | ✅ | 12 mock athletes com dados reais |
| Filtrar por posição | ✅ | 12 posições diferentes |
| Filtrar por escola | ✅ | 4 escolas |
| Filtrar por time | ✅ | Com time / Sem time / Todos |
| Criar atleta | ⚠️ | Form modal, não persiste sem API |
| Editar atleta | ⚠️ | Modal, não persiste sem API |
| Deletar atleta | ⚠️ | Confirmação, não persiste sem API |
| Empty states | ✅ | Atraentes com CTA |

### ⚽ **Gerenciamento de Equipes**
| Feature | Status | Detalhes |
|---------|--------|----------|
| Listar times | ✅ | 4 mock teams |
| Criar time | ⚠️ | Modal form |
| Editar time | ⚠️ | Modal form |
| Deletar time | ⚠️ | Confirmação |
| Gerenciar atletas/time | ✅ | Modal dual-panel |
| Contador real-time | ✅ | Atletas por team via AppContext |

### 📊 **Dashboard**
- 4 KPI cards (total atletas, teams, coaches, adesão%)
- Alerts contextuais (primeiros passos, atenção)
- 2 gráficos de performance
- Activity feed timeline

### 🤖 **AI Coach Assistant**
- Chat interface
- 4 sugestões rápidas (treino, performance, tática, talento)
- Simula respostas de IA
- Página dedicada

### 👤 **Perfil do Usuário**
- Info básicas (nome, email, role)
- Avatar com fallback Dicebear
- Edição simples

---

## 🎨 Design System

### Cores (Vibrant Sports Palette)
```
Primária: Blue #3B82F6
Sucesso: Green #22C55E
Ação: Orange #F97316
Premium: Purple #A855F7
Info: Cyan #06B6D4
Neutro: Slate (50-950)
```

### Componentes Reutilizáveis
```
Button.tsx          - Primário, secundário, outline, loading
Input.tsx           - Com label, error state, icon
Card.tsx            - Container básico
Modal.tsx           - Dialog com z-[9999]
Alert.tsx           - Success, error, warning
Badge.tsx           - Tags coloridas
Avatar.tsx          - Usuário com fallback
EmptyState.tsx      - Telas vazias atraentes
SearchFilters.tsx   - Busca + filtros avançados
```

### Temas
- **Light mode**: Fundo claro, textos escuros
- **Dark mode**: Fundo escuro, textos claros + contraste WCAG AA
- **Toggle**: No Header, preserva preferência

---

## 📂 Estrutura de Pastas

```
src/
├── components/           # Reutilizáveis
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Alert.tsx
│   ├── EmptyState.tsx       ✨ NEW
│   ├── SearchFilters.tsx    ✨ NEW
│   ├── AthleteCard.tsx
│   ├── TeamCard.tsx
│   ├── DashboardCard.tsx
│   ├── StatCard.tsx
│   ├── BarChart.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── AICoachAssistant.tsx
│   ├── AthleteFormModal.tsx
│   ├── TeamEditModal.tsx
│   ├── TeamAthletesModal.tsx
│   └── ...others
│
├── pages/                # Rotas principais
│   ├── Home.tsx         # Landing page
│   ├── Login.tsx        # Autenticação
│   ├── Register.tsx     # Registro
│   ├── Dashboard.tsx    # KPIs e analytics
│   ├── Athletes.tsx     # ✨ REFACTORED (+ filtros)
│   ├── Teams.tsx        # ✨ REFACTORED (+ animations)
│   ├── AIAssistant.tsx  # Chat AI
│   ├── Categories.tsx   # Categorias de times
│   ├── Coaches.tsx      # Gerenciar treinadores
│   ├── UserProfile.tsx  # Perfil
│   └── AthleteProfile.tsx
│
├── context/             # State global
│   ├── AuthContext.tsx
│   ├── AppContext.tsx
│   ├── ThemeContext.tsx
│   ├── CoachContext.tsx
│   ├── NotificationContext.tsx
│   ├── AttendanceContext.tsx
│   ├── EvaluationContext.tsx
│   ├── PermissionContext.tsx
│   └── ReactQueryProvider.tsx
│
├── services/            # API/integração
│   ├── api.ts
│   ├── athleteService.ts
│   ├── teamService.ts
│   ├── coachService.ts
│   ├── categoryService.ts
│   ├── attendanceService.ts
│   ├── evaluationService.ts
│   ├── avatarService.ts
│   └── insightsService.ts
│
├── hooks/               # Custom React hooks
│   ├── useAthletes.ts
│   └── useCategories.ts
│
├── types/               # TypeScript interfaces
│   └── index.ts
│
├── config/              # Configurações
│   └── supabase.ts
│
└── index.css            # Estilos globais
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────┐
│   React Components  │
│  (Button, Input)    │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   Pages (Rotas)     │
│  (Athletes, Teams)  │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Context API        │
│  (AppContext...)    │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Services (API)     │
│  (axios, fetch)     │
└─────────────────────┘
```

### Exemplo: Adicionar Atleta
1. User clica "Novo Atleta" → abre AthleteFormModal
2. Preenche form → clica Salvar
3. Modal chama `handleSaveAthlete()`
4. Que chama `athleteService.create()`
5. Service faz POST pra API (ou simula com delay)
6. Response volta pra Athletes.tsx
7. AppContext atualiza `athletes` state
8. UI re-renderiza com novo atleta

---

## 🎯 Melhorias Recentes (Jan 2026)

### Novo
- ✅ EmptyState component
- ✅ SearchFilters component
- ✅ Animações smooth (fade-in, slide-in)
- ✅ Dark mode WCAG AA
- ✅ Real-time team-athlete sync
- ✅ Mobile-first responsive design

### Refatorado
- Athletes.tsx: Novo UI com filtros
- Teams.tsx: Novo UI com animations
- Dashboard.tsx: Estrutura corrigida

### Melhorado
- Modal z-index management
- Contraste em dark mode
- Transições em todas páginas
- Stats dinâmicas em headers

---

## 🧪 Testing Checklist

- [ ] Login/Logout funciona
- [ ] Athletes page mostra 12 mock athletes
- [ ] Filtros funcionam (posição, escola, status)
- [ ] Teams page mostra 4 mock teams
- [ ] Gerenciar atletas abre modal
- [ ] Dark mode toggle muda tema
- [ ] Dashboard mostra KPIs corretos
- [ ] EmptyState aparece quando nada buscado
- [ ] Animações rodando smooth
- [ ] Mobile (375px) responsive
- [ ] Tablet (768px) responsive
- [ ] Desktop (1024px+) responsive

---

## 🔧 Configuração & Variáveis

### Environment
```bash
# .env.local
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Demo Mode
- Sem credenciais reais = app usa mock data automaticamente
- Atletas mostrados do AppContext.SAMPLE_ATHLETES
- Teams do AppContext.SAMPLE_TEAMS

---

## 📚 Documentação Referências

- [Copilot Instructions](/copilot-instructions.md) - Arquitetura detalhada
- [Melhorias UX Jan 2026](/MELHORIAS_UX_JAN2026.md) - Changelog completo
- [TailwindCSS](https://tailwindcss.com) - Utility-first CSS
- [React 18](https://react.dev) - Framework

---

## 💡 Tips & Tricks

### Como adicionar página nova
1. Crie `src/pages/NomePage.tsx`
2. Importe em `src/App.tsx`
3. Adicione rota: `<Route path="/name" element={<NomePage />} />`
4. Use componentes do `src/components/`
5. Tipifique com interfaces de `src/types/`

### Como usar filtros em página
```tsx
import SearchFilters from '../components/SearchFilters'

const [filters, setFilters] = useState({ search: '' })

const filtered = useMemo(() => {
  return items.filter(item => {
    if (!item.name.includes(filters.search)) return false
    if (filters.position && item.position !== filters.position) return false
    return true
  })
}, [items, filters])

return (
  <>
    <SearchFilters onFiltersChange={setFilters} />
    <GridOfItems items={filtered} />
  </>
)
```

### Theme-aware styling
```tsx
const { theme } = useTheme()

<div className={theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
  Conteúdo
</div>
```

---

## 🚨 Troubleshooting

| Problema | Solução |
|----------|---------|
| Não compila | `rm -rf node_modules` + `npm install` |
| HMR não atualiza | Reinicie servidor (`npm run dev`) |
| Imagens não carregam | Verifique caminho em `public/` |
| Dark mode não ativa | Verifique ThemeContext em header |
| Filtros não funcionam | Confirme `onFiltersChange` prop passada |

---

## 📞 Suporte

Para dúvidas sobre:
- **Arquitetura**: Ver copilot-instructions.md
- **Componentes**: Buscar em `src/components/`
- **Páginas**: Buscar em `src/pages/`
- **Tipos**: Ver `src/types/index.ts`

---

**Última atualização**: 13 de Janeiro, 2026  
**Versão**: 0.2.0 (Com melhorias UX)  
**Status**: 🟢 Pronto para teste/demo

