# PROWEB Sports - Instruções para Agentes de IA

## Visão Geral do Projeto

**PROWEB Sports** é uma plataforma web profissional para gerenciamento de atletas e categorias de base em escolas de futebol. Stack: React 18 + TypeScript + Vite + TailwindCSS.

### Arquitetura em Alto Nível

```
┌─────────────────────────────────────────┐
│         React Components (UI)            │
│  (Button, Input, Card, Modal, Alert)    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Pages (Rotas)                    │
│  (Home, Login, Register, Dashboard,     │
│   Athletes, Teams)                       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│       Context (State Global)             │
│  (AuthContext, AppContext)               │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Services (API/Integração)           │
│  (api.ts com axios)                      │
└─────────────────────────────────────────┘
```

## Estrutura de Pastas

- **`src/components/`** - Componentes reutilizáveis (Button, Input, Card, Header, Badge, Modal, Alert)
- **`src/pages/`** - Páginas/telas (Home, Login, Register, Dashboard, Athletes, Teams)
- **`src/context/`** - Gerenciamento global de estado (AuthContext, AppContext)
- **`src/services/`** - Chamadas de API (api.ts com axios)
- **`src/types/`** - Interfaces TypeScript (User, Athlete, Team)
- **`src/index.css`** - Estilos globais com Tailwind @layer directives

## Padrões e Convenções

### 1. **Componentes Reutilizáveis**

Todos os componentes em `src/components/` seguem este padrão:

```typescript
// Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
}
export default function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) { }
```

**Regras:**
- Props bem tipadas com TypeScript
- Desestruturação clara de props
- Composição de classes Tailwind
- Suporte a estados: `:hover`, `:focus`, `disabled`

### 2. **Paleta de Cores (TailwindCSS)**

Customizada em `tailwind.config.cjs`:

| Variável | Uso | Cores |
|----------|-----|-------|
| `dark-*` | Backgrounds, textos, bordas | 50 a 950 |
| `accent-*` | Ações primárias, destaques | Rosa vibrante (#ff2c9e) |
| `primary-*` | Secundário, gradientes | Roxo (#7d57ff) |
| `navy-*` | Acentos adicionais | Azul (#5462ff) |

**Exemplo de uso:**
```html
<button class="bg-accent-500 hover:bg-accent-600 text-white">Ação</button>
<input class="bg-dark-900 border-dark-700 focus:border-accent-500" />
```

### 3. **Formulários e Validação**

Padrão em `Login.tsx`, `Register.tsx`:

```typescript
const [formData, setFormData] = useState({ email: '', password: '' })
const [errors, setErrors] = useState<Record<string, string>>({})

const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' })) // Limpa erro ao digitar
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    // Validações aqui...
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
    }
    // Submete
}
```

**Validações padrão:**
- Email: `.includes('@')` e não vazio
- Senha: mínimo 6 caracteres
- Campos obrigatórios: `.trim()` e não vazio

### 4. **Autenticação (Context API)**

`AuthContext.tsx` gerencia estado global de user:

```typescript
interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (data: RegisterData) => Promise<void>
    logout: () => void
}

// Uso em componentes
const { user, login, logout } = useAuth()

// Rotas protegidas em App.tsx
<ProtectedRoute> <Dashboard /> </ProtectedRoute>
```

**Simulação de API:** Usa `setTimeout(1000)` para mockar chamadas - integrar com API real no `services/api.ts`.

### 5. **Tipos TypeScript**

Em `src/types/index.ts`:

```typescript
export interface Athlete {
    id: string
    name: string
    age?: number
    school?: string
    position?: string
    tracking?: { lastSeen?: string; gps?: { lat: number; lng: number } | null; heartRate?: number | null }
}

export interface Team {
    id: string
    name: string
    school?: string
    players: Athlete[]
}
```

**Regra:** Sempre estender tipos globais quando adicionar campos novos.

## Workflows Críticos

### Build e Deploy

```powershell
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

**Nota:** TypeScript é compilado automaticamente com `tsc` antes do build Vite.

### Criando Nova Página

1. Crie em `src/pages/NomePage.tsx`
2. Importe e registre rota em `src/App.tsx`
3. Use componentes do `src/components/`
4. Tipifique dados com `src/types/`

**Exemplo:**
```typescript
// src/pages/Exemplo.tsx
import { useAuth } from '../context/AuthContext'

export default function ExemploPage() {
    const { user } = useAuth()
    return <div>Conteúdo da página</div>
}
```

### Criando Novo Componente

1. Crie em `src/components/NomeComponente.tsx`
2. Exporte como `export default function`
3. Props devem ser tipadas como interface
4. Use classes Tailwind pré-definidas em `src/index.css` quando possível

**Padrão:**
```typescript
interface NomeProps {
    children: React.ReactNode
    className?: string
}

export default function Nome({ children, className = '' }: NomeProps) {
    return <div className={`card ${className}`}>{children}</div>
}
```

## Dados Mock e Exemplos

### Atletas (Athletes.tsx)
```typescript
const sampleAthletes: Athlete[] = [
    { id: '1', name: 'João Silva', age: 17, school: 'Escola A', position: 'Atacante', tracking: {...} }
]
```

### Equipes (Teams.tsx)
```typescript
const sampleTeams: Team[] = [
    { id: 't1', name: 'Time Escolar A', school: 'Escola A', players: [] }
]
```

Use como base para buscas, filtros e listas.

## Componentes Essenciais

| Componente | Uso | Props Chave |
|-----------|-----|------------|
| `Button` | Ações primárias/secundárias | `variant`, `size`, `isLoading` |
| `Input` | Formulários | `label`, `error`, `icon` |
| `Card` | Containers de conteúdo | `hover`, `className` |
| `Header` | Navegação superior | Integrado com `useAuth()` |
| `Modal` | Diálogos | `isOpen`, `onClose`, `title` |
| `Badge` | Tags/labels | `variant` |
| `Alert` | Notificações | `type`, `message`, `onClose` |

## Performance e Boas Práticas

1. **Lazy Loading:** Usar `React.lazy()` em rotas (não implementado ainda - considerar para escalabilidade)
2. **Memoization:** `React.memo()` para componentes com props complexas
3. **Acessibilidade:** Labels em inputs, `aria-*`, contrast de cores WCAG AA
4. **Animações:** Usar `transition-*` e `animate-*` do Tailwind
5. **Estado:** Context para global, useState para local

## Checklist para Novos Agentes

- [ ] Ler esta documentação completamente
- [ ] Executar `npm install` se necessário
- [ ] Rodar `npm run dev` para iniciar servidor local
- [ ] Explorar pastas: `components/`, `pages/`, `context/`, `types/`
- [ ] Entender fluxo de autenticação em `AuthContext.tsx`
- [ ] Revisar paleta de cores em `tailwind.config.cjs`
- [ ] Testar uma página simples (ex: Home → Login → Dashboard)

## Próximos Passos (Roadmap)

- [ ] Integração com API REST real (em `services/api.ts`)
- [ ] Testes unitários (Jest + React Testing Library)
- [ ] Componente Sidebar para navegação persistente
- [ ] Tela de "Redefinir Senha" (mockada em Login.tsx)
- [ ] Persistência de dados (localStorage ou API)
- [ ] Deploy (Vercel, Netlify ou outro)

---

**Última atualização:** 12 de janeiro de 2026
**Versão do Projeto:** 0.1.0
