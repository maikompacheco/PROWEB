# 🚀 Deploy Rápido - 3 Minutos

## ⚡ **Método Mais Rápido: Vercel via Web**

### 1. Acesse Vercel
👉 [https://vercel.com/new](https://vercel.com/new)

### 2. Login
- Clique em **"Continue with GitHub"**
- Autorize o Vercel a acessar seus repositórios

### 3. Importe o Projeto
- Na lista, encontre **`maikompacheco/PROWEB`**
- Clique em **"Import"**

### 4. Configure (já vem pré-configurado!)
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 5. Deploy
- Clique no botão azul **"Deploy"**
- Aguarde ~2 minutos ⏳

### 6. Pronto! 🎉
Seu link: `https://proweb-[seu-id].vercel.app`

---

## 💻 **Alternativa: Deploy via Terminal**

### Windows
```powershell
# 1. Instalar Vercel
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd c:\Users\Datamob\Desktop\PROWEB
vercel --prod
```

**Ou simplesmente:**
```powershell
# Execute o script automatizado
.\deploy-vercel.bat
```

---

## 🔄 **Atualizações Automáticas**

Após o primeiro deploy:
- Faça `git push` no GitHub
- Vercel detecta e faz deploy automático
- Novo link atualizado em 1-2 minutos

---

## 🌐 **Domínio Customizado (Opcional)**

No painel da Vercel:
1. **Settings** → **Domains**
2. Adicione seu domínio (ex: `baseone.sports`)
3. Configure DNS conforme instruções
4. Aguarde propagação (alguns minutos)

---

## ✅ **Checklist Final**

- [ ] Deploy feito com sucesso
- [ ] Link funcionando
- [ ] Testado em dispositivo móvel
- [ ] Compartilhado o link

---

## 🆘 **Problemas Comuns**

### "Command not found: vercel"
```powershell
npm install -g vercel --force
```

### "Build failed"
```powershell
# Teste localmente primeiro
npm run build
npm run preview
```

### "Port already in use"
```powershell
# Pare o servidor dev
taskkill /F /IM node.exe
```

---

## 📱 **Seu Link de Produção**

Depois do deploy, você terá:

```
🌐 URL: https://baseone-sports.vercel.app
🔒 SSL: Habilitado automaticamente
🚀 CDN: Global (rápido em todo mundo)
📊 Analytics: Incluso
```

**Compartilhe com seus usuários!** 🎉
