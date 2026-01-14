# 🚀 Guia de Deploy - BaseONE Sports

Este guia mostra como colocar o BaseONE Sports em produção.

---

## ⚡ **Método 1: Vercel (Mais Rápido)**

### Via CLI
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Fazer login
vercel login

# 3. Deploy
vercel

# 4. Deploy em produção
vercel --prod
```

### Via Interface Web (Recomendado)
1. Acesse https://vercel.com
2. Clique em **"Add New Project"**
3. Importe `maikompacheco/PROWEB` do GitHub
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**

✅ **Seu link estará pronto em ~2 minutos!**
- URL: `https://proweb-sports.vercel.app` (ou similar)
- Deploy automático a cada push no GitHub

---

## 🌐 **Método 2: Netlify**

### Via CLI
```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Build
npm run build

# 4. Deploy
netlify deploy --prod --dir=dist
```

### Via Interface Web
1. Acesse https://netlify.com
2. **"Add new site"** → **"Import from Git"**
3. Conecte GitHub e selecione `PROWEB`
4. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Deploy!

✅ **Link:** `https://baseone-sports.netlify.app`

---

## 📦 **Método 3: GitHub Pages**

### Configuração
1. No GitHub, vá em **Settings** → **Pages**
2. Ative **GitHub Actions** como source
3. Commit o arquivo `.github/workflows/deploy.yml` (já criado)
4. Push para main

✅ **Link:** `https://maikompacheco.github.io/PROWEB/`

### Ajustar Vite Config para GitHub Pages
Adicione no `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/PROWEB/', // Nome do seu repo
  // ... resto da config
})
```

---

## 🏗️ **Método 4: Build Manual + Hospedagem Própria**

```bash
# 1. Build de produção
npm run build

# 2. Arquivos estarão em /dist
# 3. Upload para seu servidor via FTP ou similar
```

**Configuração do Servidor (Nginx):**
```nginx
server {
    listen 80;
    server_name seudominio.com;
    root /var/www/proweb/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## ⚙️ **Variáveis de Ambiente**

Se usar Supabase ou APIs externas, configure:

### Vercel/Netlify
```env
VITE_SUPABASE_URL=sua-url
VITE_SUPABASE_ANON_KEY=sua-key
```

Adicione via dashboard do serviço.

---

## ✅ **Checklist Pré-Deploy**

- [ ] `npm run build` funciona sem erros
- [ ] Testar build local: `npm run preview`
- [ ] Variáveis de ambiente configuradas
- [ ] .gitignore inclui `/dist` e `/node_modules`
- [ ] README.md atualizado com link do deploy

---

## 🎯 **Recomendação Final**

Para **BaseONE Sports**, recomendo:

1. **Vercel** - Deploy mais rápido, otimizado para Vite
2. **Domínio customizado** (opcional): Configure em DNS Settings

**Link de exemplo:**
- Temporário: `https://proweb-abc123.vercel.app`
- Customizado: `https://baseone.sports` (seu domínio)

---

## 📞 **Suporte**

Se tiver problemas:
1. Verifique logs do build
2. Teste local com `npm run preview`
3. Confirme que todas dependências estão no package.json

**Comando útil:**
```bash
# Verificar build antes do deploy
npm run build && npm run preview
```

Acesse http://localhost:4173 para testar a versão de produção localmente.
