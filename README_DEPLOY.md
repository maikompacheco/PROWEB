# 🎯 Deploy SUPER RÁPIDO - BaseONE Sports

## ⚡ Execute 1 comando apenas:

```powershell
.\DEPLOY-AGORA.bat
```

**O script vai:**
1. ✅ Fazer login na Vercel (abre navegador)
2. ✅ Fazer build automático
3. ✅ Deploy em produção
4. ✅ Gerar seu link público

---

## 🌐 **Ou faça pelo site (ainda mais rápido)**

### 3 Cliques:

1. **Abra:** https://vercel.com/new
2. **Conecte GitHub** e selecione `PROWEB`
3. **Clique "Deploy"**

⏱️ **Tempo:** 2 minutos
🔗 **Link:** Gerado automaticamente

---

## 📋 **Comandos Manuais (se preferir)**

```powershell
# 1. Login (abre navegador)
vercel login

# 2. Deploy
vercel --prod
```

---

## ✨ **Resultado**

```
🌐 Production: https://baseone-sports.vercel.app
🔒 SSL: Ativo
🚀 CDN: Global
📱 Mobile: Otimizado
```

---

## 🔄 **Próximas Atualizações**

Depois do primeiro deploy, basta fazer:
```powershell
git add .
git commit -m "Update"
git push
```

A Vercel detecta e faz deploy automático! 🎉

---

## 🆘 **Problemas?**

### Erro de login
```powershell
vercel logout
vercel login
```

### Porta em uso
```powershell
taskkill /F /IM node.exe
```

---

## 🎁 **Bônus: Domínio Customizado**

No painel da Vercel:
- Settings → Domains
- Adicione: `baseone.sports`
- Configure DNS

Seu link: `https://baseone.sports` 🏆
