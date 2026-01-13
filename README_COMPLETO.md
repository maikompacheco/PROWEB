# PROWEB Sports — Plataforma de Gestão Esportiva

## 📋 Visão Geral

PROWEB Sports é uma plataforma web profissional para gerenciamento de atletas e categorias de base em escolas de futebol. O sistema permite que treinadores, coordenadores técnicos e gestores esportivos possam cadastrar, gerenciar e visualizar dados de atletas em tempo real.

**Stack:** React 18 + TypeScript + Vite + TailwindCSS + React Router

## 🚀 Início Rápido

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173/` para visualizar a aplicação.

### Build de Produção
```bash
npm run build
```

### Visualizar Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis (Button, Input, Card, Modal, etc.)
├── pages/               # Páginas (Home, Login, Register, Dashboard, Athletes, Teams)
├── context/             # Gerenciamento de estado (AuthContext, AppContext)
├── services/            # Integração com API (api.ts com axios)
├── types/               # Interfaces TypeScript (Athlete, Team, User)
├── App.tsx              # Rotas e layout principal
├── main.tsx             # Entrada da aplicação
└── index.css            # Estilos globais com Tailwind
```

## 🎨 Tema Visual

- **Background Escuro:** #0F172A (azul-marinho/roxo)
- **Cor Primária:** #FF2C9E (rosa vibrante - destaques)
- **Cor Secundária:** #7D57FF (roxo)
- **Cor Terciária:** #5462FF (azul)
- **Tipografia:** Inter (Google Fonts)

Paleta completa configurada em `tailwind.config.cjs`.

## 📄 Principais Páginas

### 1. **Home** (`/`)
- Página de boas-vindas
- Destaques de funcionalidades
- Botões de Login e Cadastro

### 2. **Login** (`/login`)
- Autenticação por email/senha
- Validação de formulário
- Redirecionamento automático para dashboard

### 3. **Register** (`/register`)
- Cadastro de novo usuário
- Campos: nome, email, clube, telefone, senha
- Validação em tempo real

### 4. **Dashboard** (`/dashboard`)
- Painel inicial com estatísticas
- Cards de resumo (atletas, equipes, treinos)
- Atividade recente

### 5. **Atletas** (`/athletes`)
- Listagem de atletas
- Busca e filtros
- Modal para criar novo atleta
- Exibição de dados biométricos (FC, GPS)

### 6. **Equipes** (`/teams`)
- Gerenciamento de equipes
- Associação de jogadores
- Modal para criar nova equipe

## 🔐 Autenticação

O sistema usa **Context API** com `AuthContext` para gerenciar estado global de autenticação. 

Atualmente, a autenticação é **mockada** com `setTimeout(1000)` para simular chamadas à API.

**Para integração real:**
1. Implementar endpoints em `src/services/api.ts`
2. Usar axios para chamadas HTTP
3. Adicionar token JWT ao localStorage

```typescript
// Exemplo de uso
const { user, login, logout } = useAuth()

// Rotas protegidas com ProtectedRoute
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## 📊 Componentes Principais

| Componente | Uso | Props Principais |
|-----------|-----|---|
| **Button** | Ações primárias/secundárias | `variant`, `size`, `isLoading` |
| **Input** | Formulários com validação | `label`, `error`, `icon` |
| **Card** | Containers de conteúdo | `hover`, `className` |
| **Modal** | Diálogos e formulários | `isOpen`, `onClose`, `title` |
| **Badge** | Tags e labels | `variant` |
| **Alert** | Notificações | `type`, `message`, `onClose` |
| **Header** | Navegação superior | Integrado com `useAuth()` |
| **Sidebar** | Navegação lateral (mobile/desktop) | Responsive |

## 🎯 Validação de Formulários

Padrão implementado em todas as páginas de formulário:

```typescript
const [formData, setFormData] = useState({...})
const [errors, setErrors] = useState<Record<string, string>>({})

const handleChange = (e) => {
  setFormData(prev => ({ ...prev, [name]: value }))
  if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
}

const handleSubmit = (e) => {
  e.preventDefault()
  // Validações...
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }
  // Submit...
}
```

**Validações padrão:**
- Email: deve conter `@` e não ser vazio
- Senha: mínimo 6 caracteres
- Campos obrigatórios: `.trim()` e não vazios

## 🔗 Integração com API

O arquivo `src/services/api.ts` está preparado para integração com API REST.

**Exemplo de integração:**
```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://seu-dominio.com/api'
})

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}
```

## 📈 Tipos TypeScript

```typescript
export interface Athlete {
  id: string
  name: string
  age?: number
  school?: string
  position?: string
  tracking?: {
    lastSeen?: string
    gps?: { lat: number; lng: number } | null
    heartRate?: number | null
  }
}

export interface Team {
  id: string
  name: string
  school?: string
  players: Athlete[]
}
```

## 🎨 Customização de Estilos

### Classes Tailwind Predefinidas

```css
.btn-primary    /* Botão primário (rosa) */
.btn-secondary  /* Botão secundário (roxo) */
.btn-outline    /* Botão outline */
.input-field    /* Campo de input */
.card           /* Container padrão */
.card-hover     /* Container com hover */
```

### Paleta de Cores

- `dark-50` a `dark-950` - Tons de cinza/preto
- `accent-50` a `accent-950` - Rosa vibrante
- `primary-50` a `primary-950` - Roxo
- `navy-50` a `navy-950` - Azul

## 🚀 Próximos Passos

- [ ] Integrar com API REST real
- [ ] Implementar autenticação JWT
- [ ] Adicionar testes unitários (Jest + React Testing Library)
- [ ] Tela de redefinição de senha
- [ ] Persistência de dados (localStorage/API)
- [ ] Dark mode toggle
- [ ] Relatórios e gráficos
- [ ] Exportar dados (CSV/PDF)
- [ ] Deploy (Vercel, Netlify, AWS)

## 📚 Instruções para Agentes de IA

Consulte [`.github/copilot-instructions.md`](.github/copilot-instructions.md) para guia completo de padrões, convenções e boas práticas do projeto.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Compila para produção
- `npm run preview` - Visualiza build local

## 🔧 Tecnologias Utilizadas

- **React 18.2** - UI Framework
- **TypeScript 5.2** - Type Safety
- **Vite 4.4** - Build tool
- **TailwindCSS 3.4** - Utilitário CSS
- **React Router 6.14** - Roteamento
- **Axios 1.4** - HTTP Client
- **PostCSS 8.4** - CSS Processing

## 📄 Licença

Todos os direitos reservados © 2026 PROWEB Sports.

---

**Última atualização:** 12 de janeiro de 2026 | **Versão:** 0.1.0
