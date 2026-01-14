# 📋 PHASE 2 - PLAN: Atletas & Equipes (Próximo Passo)

**Data:** 13 de janeiro de 2026  
**Status:** Pronto para implementação  
**Tempo estimado:** 2-3 horas  
**Impacto:** Transformação visual de 80% do app + UX completa

---

## 🎯 OBJETIVO

Unificar o padrão visual e funcional das páginas **Atletas** e **Equipes**, criando cards reutilizáveis, filtros inteligentes e grids expansivos que mantêm a **profissionalismo** alcançado na Fase 1.

---

## 📐 ARQUITETURA ESPERADA

```
┌─────────────────────────────────────────────────────┐
│          ATLETAS / EQUIPES                          │
├─────────────────────────────────────────────────────┤
│ [Buscar...] [Filtros ↓] [+ Novo Atleta]            │ ← Fixed top
├─────────────────────────────────────────────────────┤
│ [View Grid] [View List] | Ordenar: [▼ Nome]        │ ← Toggle view
├─────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│ │ João Silva   │ │ Maria Santos │ │ Carlos Lima  │  │
│ │ Atacante     │ │ Meia         │ │ Goleiro      │  │
│ │ Categoria U-17 │ │ Ativo       │ │ Treino OK    │  │
│ │ [→ Editar]   │ │ [→ Editar]   │ │ [→ Editar]   │  │
│ └──────────────┘ └──────────────┘ └──────────────┘  │
│ ┌──────────────┐ ┌──────────────┐                    │
│ │ Paulo Costa  │ │ Ana Silva    │  ... (scroll)     │
│ └──────────────┘ └──────────────┘                    │
└─────────────────────────────────────────────────────┘
```

---

## 📝 TAREFAS ESPECÍFICAS

### 1. Criar `AthleteCard.tsx` (NOVO)

**Responsabilidade:** Card reutilizável para exibição de atleta

```tsx
interface AthleteCardProps {
    athlete: Athlete
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    onView: (id: string) => void
    variant?: 'grid' | 'list'  // Para 2 layouts
}

export default function AthleteCard({ athlete, onEdit, ... }: AthleteCardProps)
```

**Visual esperado (Grid):**
```
┌──────────────────────┐
│  [Avatar]            │
│  João Silva          │
│  👥 Atacante         │
│  📅 U-17             │
│  🟢 Ativo            │
│                      │
│ [Ver] [Editar] [...]│
└──────────────────────┘
```

**Visual esperado (List):**
```
│ João Silva │ Atacante │ U-17 │ 🟢 Ativo │ [→ Editar]
```

**Diferenciais:**
- Sem muita poluição
- Hover state sutil
- 2 layouts (grid/list toggle)
- Ações claras (editar/ver/deletar)

---

### 2. Criar `TeamCard.tsx` (NOVO)

**Responsabilidade:** Card reutilizável para exibição de equipe

```tsx
interface TeamCardProps {
    team: Team
    athleteCount: number
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    variant?: 'grid' | 'list'
}
```

**Visual esperado (Grid):**
```
┌──────────────────────┐
│  ⚽ Time A            │
│  Categoria U-17      │
│  📍 Escola X         │
│  👥 12 atletas       │
│                      │
│ [Ver] [Editar] [...] │
└──────────────────────┘
```

**Padrão:** Idêntico ao AthleteCard (consistência)

---

### 3. Refatorar `pages/Athletes.tsx`

**Mudanças esperadas:**

```tsx
// Adicionar novo state
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
const [sortBy, setSortBy] = useState<'name' | 'position' | 'team'>('name')

// Layout simplificado
return (
  <div>
    {/* Header */}
    <DashboardHeader title="Atletas" description="..." />
    
    {/* Controls - Fixed horizontal */}
    <div className="sticky top-16 bg-white border-b px-8 py-4 flex items-center justify-between gap-4">
      <SearchInput />
      <AdvancedFilters />
      <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      <SortDropdown sortBy={sortBy} onChange={setSortBy} />
      <Button variant="primary">+ Novo Atleta</Button>
    </div>
    
    {/* Grid / List */}
    {viewMode === 'grid' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
        {athletes.map(a => <AthleteCard key={a.id} athlete={a} ... />)}
      </div>
    ) : (
      <div className="space-y-2 p-8">
        {athletes.map(a => <AthleteCard key={a.id} athlete={a} variant="list" ... />)}
      </div>
    )}
  </div>
)
```

**Diferenciais:**
- ✅ Search e filtros no topo (sticky)
- ✅ Toggle grid/list
- ✅ Sort dropdown
- ✅ Cards unificados
- ✅ Sem scroll na toolbar
- ✅ Grid expansivo (máx colunas em espaço disponível)

---

### 4. Refatorar `pages/Teams.tsx`

**Idêntico ao Athletes.tsx, apenas com TeamCard**

---

## 🎨 DESIGN DETAILS

### Card Layout (Grid)
```
Padding: 24px (p-6)
Border: 1px neutral-200/800
Border-radius: 8px
Hover: shadow-md + border-primary-300 (light mode)
       shadow-md + border-primary-700 (dark mode)
Transition: all 200ms ease-out
```

### Icons & Badges
```
Badge Posição:  badge variant="outline"
Badge Status:   badge variant="success" / "warning" / "error"
Badge Categoria: texto simples (sem badge)
```

### Modo Dark Adaptação
```
Grid cards: neutral-50 (light) / neutral-900 (dark)
Text primário: neutral-900 (light) / neutral-50 (dark)
Text secundário: neutral-600 (light) / neutral-400 (dark)
Hover border: primary-300 (light) / primary-700 (dark)
```

---

## 🔄 COMPONENTES REUTILIZÁVEIS NECESSÁRIOS

| Componente | Atual? | Ação |
|-----------|--------|------|
| `AthleteCard` | ❌ | **CRIAR** |
| `TeamCard` | ❌ | **CRIAR** |
| `ViewToggle` | ❌ | **CRIAR** |
| `SearchInput` | ✅ | Reutilizar |
| `AdvancedFilters` | ✅ | Reutilizar |
| `SortDropdown` | ❌ | **CRIAR** |

---

## ✅ CHECKLIST IMPLEMENTAÇÃO

### Antes de Começar
- [ ] Ler este documento completamente
- [ ] Revisar `ANTES_E_DEPOIS.md` para entender estética
- [ ] Revisar `GUIA_RAPIDO_POS_TRANSFORMACAO.md`

### Criação de Componentes
- [ ] `AthleteCard.tsx` (com props tipadas)
- [ ] `TeamCard.tsx` (padrão idêntico ao AthleteCard)
- [ ] `ViewToggle.tsx` (botões grid/list toggle)
- [ ] `SortDropdown.tsx` (select para ordenação)

### Refatoração de Pages
- [ ] `Athletes.tsx` com novos componentes
- [ ] `Teams.tsx` com novos componentes
- [ ] Remover componentes antigos/não usados

### Visual & UX
- [ ] Cards com hover state
- [ ] Responsividade em 3 breakpoints (mobile/tablet/desktop)
- [ ] Dark mode funcionando
- [ ] Sem scroll em toolbar (sticky top)
- [ ] Grid expansivo (máx colunas dinâmicas)

### Testing
- [ ] Nenhum erro TypeScript
- [ ] `npm run build` sem avisos
- [ ] Testar em resolução: 390px, 768px, 1920px
- [ ] Testar dark mode
- [ ] Testar com muitos/poucos atletas

---

## 📐 BREAKPOINTS & GRID

```tsx
// Responsive grid columns
grid-cols-1              // Mobile (< 640px)
sm:grid-cols-2           // Tablet (≥ 640px)
lg:grid-cols-3           // Desktop (≥ 1024px)
xl:grid-cols-4           // Wide (≥ 1280px)
2xl:grid-cols-5          // Ultra-wide (≥ 1536px)

// Spacing
gap-6 = 24px             // Entre cards
p-8 = 32px               // Container padding
p-6 = 24px               // Card padding
```

---

## 🔐 REGRAS DE IMPLEMENTAÇÃO

✅ **Faça:**
- Use `isDark` para diferenciar dark/light
- Reutilize cores: `primary-*`, `neutral-*`
- Hover states claros mas sutis
- TypeScript typado (interfaces)
- Cards com máx 150px de altura (sem quebra)

❌ **Evite:**
- Cores hardcoded
- Muitos ícones/emojis por card
- Cards muito grandes (>300px largura ideal)
- Animações desnecessárias
- Lógica complexa no card (apenas display)

---

## 📊 MÉTRICAS DE SUCESSO - FASE 2

| Métrica | Target | Validação |
|---------|--------|-----------|
| Cards unificados | 2 (Athlete + Team) | ✅ Criados |
| Layouts | 2 (grid + list) | ✅ Funcionam ambos |
| Scroll toolbar | 0 (sticky) | ✅ Fixed top |
| Grid columns | 4-5 max | ✅ Responsivo |
| Hover state | Sutil mas claro | ✅ Visual OK |
| Dark mode | 100% | ✅ Todo consistente |

---

## 🚀 PRÓXIMA FASE (FASE 3)

Após Fase 2 completada:

1. **Modais:** Corrigir modais que cortam conteúdo
2. **Validação:** Feedback em tempo real
3. **Popovers:** Para ações secundárias
4. **Confirmações:** Delete/cancel flows

---

## 📞 SE FICAR PRESO

1. Olhe exemplos em componentes já refatorados:
   - `Header.tsx` para structure
   - `Dashboard.tsx` para layout
   - `Sidebar.tsx` para responsividade

2. Valide com:
   ```bash
   npm run build   # Erros TypeScript
   npm run dev     # Visual na prática
   ```

3. Leia novamente este documento + GUIA_RAPIDO

---

## ⏱️ ESTIMATIVA DETALHADA

- AthleteCard: 30 min
- TeamCard: 15 min (reuses AthleteCard pattern)
- ViewToggle: 15 min
- SortDropdown: 15 min
- Athletes.tsx refactor: 30 min
- Teams.tsx refactor: 20 min
- Testing & fixes: 30 min
- **Total: ~2.5 horas**

---

**Versão:** 1.0  
**Data:** 13 de janeiro de 2026  
**Status:** ✅ Pronto para implementação  
**Próximo:** Iniciar Fase 2 (AthleteCard)

