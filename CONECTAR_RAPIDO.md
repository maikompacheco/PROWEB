# 🚀 CONECTAR PROWEB AO SUPABASE - GUIA RÁPIDO

## ⏱️ Tempo total: ~15 minutos

### PASSO 1: Criar Projeto Supabase (5 min)
```
1. Acessar: https://app.supabase.com
2. Clicar: "New Project"
3. Preencher:
   - Project name: proweb-sports
   - Database password: (deixar gerar automaticamente)
   - Region: South America (São Paulo) ⭐ IMPORTANTE
4. Clicar: "Create new project"
5. Esperar 2-3 minutos até ficar pronto
```

### PASSO 2: Copiar Credenciais (2 min)
```
1. No painel Supabase, clicar: Settings → API
2. Copiar:
   - Project URL
   - anon (public) key
3. (Vão parecer assim:)
   URL:  https://abc123xyz.supabase.co
   KEY:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### PASSO 3: Configurar .env.local (1 min)
```powershell
# Abrir arquivo:
# c:\Users\Datamob\Desktop\PROWEB\.env.local

# Substituir:
VITE_SUPABASE_URL=https://abc123xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Salvar (Ctrl+S)
```

### PASSO 4: Criar Banco de Dados (3 min)
```
1. No painel Supabase: SQL Editor → New query
2. Copiar TUDO o código de:
   📄 SUPABASE_PRODUCAO.md (seção "4️⃣")
3. Colar no editor
4. Clicar: "Run" (ou Ctrl+Enter)
5. Esperar completar ✅
```

### PASSO 5: Inserir Dados de Teste (2 min)
```
1. SQL Editor → New query
2. Copiar TUDO o código de:
   📄 SUPABASE_PRODUCAO.md (seção "5️⃣")
3. Colar e executar ("Run")
```

### PASSO 6: Validar no App (2 min)
```powershell
# No terminal:
npm run dev

# No navegador (http://localhost:5173):
1. Clicar "Criar Conta"
2. Usar email + senha qualquer
3. Fazer login
4. Ir para "Atletas" → deve aparecer 3 atletas ✅
```

---

## ✅ Checklist Final

- [ ] Projeto Supabase criado
- [ ] .env.local preenchido
- [ ] SQL executado (8 tabelas criadas)
- [ ] Dados iniciais inseridos
- [ ] Servidor rodando (npm run dev)
- [ ] Login funcionando
- [ ] Atletas carregando do banco real ✅

---

## 🎯 Resultado Esperado

**Após completar todos os passos:**
- App conectado a banco de dados real
- Usuários podem se registrar
- Atletas persistem no banco de dados
- Pronto para mais features

---

**Status:** 🟢 PRODUÇÃO PRONTA

Arquivo completo: [SUPABASE_PRODUCAO.md](SUPABASE_PRODUCAO.md)
