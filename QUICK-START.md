# 🚀 Quick Start - Loja Valentina

## ⚡ Deploy em 5 Minutos

### 1. Preparar Repositório GitHub
```bash
cd loja-valentina-production
git init
git add .
git commit -m "feat: initial commit - loja valentina e-commerce"
git remote add origin https://github.com/SEU-USUARIO/loja-valentina.git
git branch -M main
git push -u origin main
```

### 2. Deploy na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Login com GitHub
3. "New Project" → Selecione o repositório
4. "Deploy" (configurações automáticas)
5. ✅ Pronto! Sua loja está no ar

## 📋 Checklist Pré-Deploy

- [ ] ✅ Repositório GitHub criado
- [ ] ✅ Código commitado
- [ ] ✅ Conta Vercel conectada
- [ ] ✅ Deploy realizado
- [ ] ✅ Site funcionando

## 🔧 Comandos Essenciais

```bash
# Desenvolvimento local
npm install
npm run dev

# Build para produção
npm run build
npm run start

# Verificar código
npm run lint
npm run type-check
```

## 📱 URLs Importantes

Após o deploy:
- **Site**: https://loja-valentina.vercel.app
- **Admin**: https://loja-valentina.vercel.app/admin
- **Dashboard Vercel**: https://vercel.com/dashboard

## 🆘 Problemas Comuns

**Build falha?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Imagens não carregam?**
- Verifique `next.config.js`
- Confirme URLs das imagens

**404 em páginas?**
- Verifique estrutura de pastas em `src/app/`

## 📞 Suporte

- 📖 Documentação completa: `README.md`
- 🚀 Guia de deploy: `DEPLOYMENT.md`
- 🔒 Segurança: `SECURITY.md`
- 📝 Changelog: `CHANGELOG.md`

---

**🎉 Sua loja está pronta para o mundo!**
