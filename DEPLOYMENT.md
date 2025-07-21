# Guia de Deploy - Loja Valentina

Este documento contém instruções detalhadas para fazer o deploy da Loja Valentina no GitHub e Vercel.

## 📋 Pré-requisitos

- [ ] Conta no GitHub
- [ ] Conta na Vercel
- [ ] Git instalado localmente
- [ ] Node.js 18.17+ instalado

## 🚀 Passo a Passo para Deploy

### 1. Preparar o Repositório GitHub

#### 1.1 Criar Repositório no GitHub
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome sugerido: `loja-valentina`
4. Marque como "Public" ou "Private" conforme preferir
5. **NÃO** inicialize com README (já temos um)
6. Clique em "Create repository"

#### 1.2 Inicializar Git Local
```bash
# Navegue até a pasta do projeto
cd loja-valentina-production

# Inicialize o repositório Git
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "feat: initial commit - loja valentina e-commerce"

# Adicione o remote origin (substitua pela URL do seu repositório)
git remote add origin https://github.com/SEU-USUARIO/loja-valentina.git

# Envie para o GitHub
git branch -M main
git push -u origin main
```

### 2. Deploy na Vercel

#### 2.1 Deploy Automático (Recomendado)

1. **Acesse a Vercel**:
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub

2. **Importe o Projeto**:
   - Clique em "New Project"
   - Selecione "Import Git Repository"
   - Escolha o repositório `loja-valentina`

3. **Configurações de Deploy**:
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)
   - **Install Command**: `npm install` (padrão)

4. **Variáveis de Ambiente** (opcional):
   - Clique em "Environment Variables"
   - Adicione as variáveis do arquivo `.env.example` se necessário

5. **Deploy**:
   - Clique em "Deploy"
   - Aguarde o processo de build (2-5 minutos)

#### 2.2 Deploy Manual via CLI

```bash
# Instale a CLI da Vercel globalmente
npm install -g vercel

# Faça login na Vercel
vercel login

# Execute o deploy
vercel

# Para deploy em produção
vercel --prod
```

### 3. Configurações Pós-Deploy

#### 3.1 Domínio Personalizado (opcional)
1. Na dashboard da Vercel, vá para o projeto
2. Clique em "Settings" > "Domains"
3. Adicione seu domínio personalizado
4. Configure os DNS conforme instruções

#### 3.2 Configurações de Performance
- ✅ Compressão Gzip habilitada automaticamente
- ✅ CDN global da Vercel
- ✅ Otimização automática de imagens
- ✅ Cache inteligente

#### 3.3 Monitoramento
- Analytics da Vercel habilitado automaticamente
- Speed Insights disponível no painel
- Logs de função disponíveis

### 4. Atualizações Futuras

#### 4.1 Deploy Automático
Após o setup inicial, qualquer push para a branch `main` fará deploy automático:

```bash
# Faça suas alterações
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

#### 4.2 Preview Deploys
Branches e Pull Requests geram deploys de preview automaticamente:

```bash
# Crie uma branch para nova feature
git checkout -b feature/nova-funcionalidade

# Faça suas alterações e commit
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push da branch
git push origin feature/nova-funcionalidade
```

### 5. Troubleshooting

#### 5.1 Problemas Comuns

**Build falha com erro de dependências:**
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

**Erro de imagens não carregando:**
- Verifique se as URLs estão em `next.config.js`
- Confirme se as imagens são acessíveis publicamente

**Erro 404 em rotas:**
- Verifique se os arquivos estão na estrutura correta do App Router
- Confirme se não há caracteres especiais nos nomes dos arquivos

#### 5.2 Logs e Debug
```bash
# Ver logs da Vercel
vercel logs

# Build local para debug
npm run build
npm run start
```

### 6. Checklist Final

Antes de considerar o deploy completo, verifique:

- [ ] ✅ Site carrega corretamente
- [ ] ✅ Todas as páginas são acessíveis
- [ ] ✅ Imagens carregam corretamente
- [ ] ✅ Carrinho de compras funciona
- [ ] ✅ Formulários funcionam
- [ ] ✅ Site é responsivo (mobile/desktop)
- [ ] ✅ Performance é satisfatória (Lighthouse > 90)
- [ ] ✅ SEO básico configurado
- [ ] ✅ Favicon aparece corretamente

### 7. URLs Importantes

Após o deploy, você terá:
- **URL de Produção**: `https://loja-valentina.vercel.app` (ou seu domínio)
- **Dashboard Vercel**: `https://vercel.com/dashboard`
- **Repositório GitHub**: `https://github.com/SEU-USUARIO/loja-valentina`

### 8. Próximos Passos

Após o deploy básico, considere implementar:
- [ ] Sistema de pagamento real (Stripe, MercadoPago)
- [ ] Banco de dados (Supabase, PlanetScale)
- [ ] Sistema de autenticação (NextAuth.js)
- [ ] Analytics avançado (Google Analytics)
- [ ] Sistema de email (Resend, SendGrid)
- [ ] Testes automatizados
- [ ] CI/CD avançado

---

**🎉 Parabéns! Sua loja está no ar!**

Para suporte adicional, consulte:
- [Documentação da Vercel](https://vercel.com/docs)
- [Documentação do Next.js](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/SEU-USUARIO/loja-valentina/issues)
