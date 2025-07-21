# Loja Valentina - E-commerce Moderno

Uma loja virtual moderna e responsiva construída com Next.js 15, React 18 e Tailwind CSS. O projeto oferece uma experiência completa de e-commerce com carrinho de compras, sistema de autenticação, painel administrativo e muito mais.

## 🚀 Funcionalidades

### Para Clientes
- **Catálogo de Produtos**: Navegação intuitiva com filtros e busca avançada
- **Carrinho de Compras**: Adicionar, remover e gerenciar produtos
- **Sistema de Autenticação**: Login, cadastro e área do cliente
- **Checkout Completo**: Processo de compra simplificado
- **Comparação de Produtos**: Compare diferentes produtos lado a lado
- **Avaliações e Reviews**: Sistema de avaliações dos produtos
- **Newsletter**: Cadastro para receber novidades
- **Chat Widget**: Suporte ao cliente integrado

### Para Administradores
- **Painel Administrativo**: Gerenciamento completo da loja
- **Gestão de Produtos**: Adicionar, editar e remover produtos
- **Gestão de Categorias**: Organização do catálogo
- **Controle de Pedidos**: Acompanhamento de vendas
- **Configurações**: Personalização da loja

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 18, TypeScript
- **Estilização**: Tailwind CSS
- **UI Components**: Headless UI
- **Gerenciamento de Estado**: Context API + useReducer
- **Utilitários**: clsx, tailwind-merge

## 📋 Pré-requisitos

- Node.js 18.17 ou superior
- npm, yarn, pnpm ou bun

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd loja-valentina-production
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Execute o projeto em desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### 4. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🌐 Deploy na Vercel

### Deploy Automático (Recomendado)

1. **Conecte seu repositório GitHub à Vercel**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Selecione este repositório
   - Clique em "Deploy"

2. **Configurações automáticas**:
   - A Vercel detectará automaticamente que é um projeto Next.js
   - As configurações de build serão aplicadas automaticamente
   - O deploy será feito automaticamente a cada push na branch main

### Deploy Manual via CLI

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Para deploy em produção
vercel --prod
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── admin/             # Painel administrativo
│   ├── carrinho/          # Página do carrinho
│   ├── checkout/          # Processo de checkout
│   ├── produto/           # Páginas de produtos
│   └── ...
├── components/            # Componentes reutilizáveis
│   ├── layout/           # Componentes de layout
│   ├── ui/               # Componentes de interface
│   └── ...
├── contexts/             # Contextos React
├── data/                 # Dados mockados
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e helpers
└── types/                # Definições TypeScript
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start

# Linting
npm run lint
```

## 🌍 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (opcional):

```env
# Exemplo de variáveis que podem ser adicionadas
NEXT_PUBLIC_SITE_URL=https://sua-loja.vercel.app
NEXT_PUBLIC_ANALYTICS_ID=seu-analytics-id
```

## 📱 Responsividade

O projeto é totalmente responsivo e otimizado para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🎨 Personalização

### Cores e Tema
Edite o arquivo `src/config/theme.ts` para personalizar as cores da loja.

### Dados dos Produtos
Os produtos estão em `src/data/products.ts` - substitua pelos seus dados reais.

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm run test

# Executar testes em modo watch
npm run test:watch
```

## 📈 Performance

O projeto está otimizado para performance com:
- ⚡ Next.js App Router
- 🖼️ Otimização automática de imagens
- 📦 Code splitting automático
- 🎯 Lazy loading de componentes
- 📱 Progressive Web App ready

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do chat widget na aplicação ou abra uma issue no GitHub.

---

**Desenvolvido com ❤️ usando Next.js e React**
