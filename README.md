# Payment Checkout

Aplicativo de demonstração de fluxo de checkout completo construído com Next.js, React e TypeScript. Este projeto implementa um processo de pagamento em múltiplas etapas com interface moderna, simulação de pagamentos e persistência local de pedidos.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Recursos Principais](#recursos-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Funciona](#como-funciona)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Fluxo de Checkout](#fluxo-de-checkout)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Persistência de Dados](#persistência-de-dados)
- [Comandos Úteis](#comandos-úteis)
- [Problemas Comuns](#problemas-comuns)
- [Próximos Passos](#próximos-passos)

## 🎯 Sobre o Projeto

Este é um protótipo de e-commerce focado no fluxo de checkout, desenvolvido para demonstrar boas práticas de UX/UI em processos de pagamento. O projeto **não integra com gateways de pagamento reais** - toda a lógica de pagamento é simulada no lado do cliente para fins de demonstração e testes.

### O que faz este projeto especial?

- **Fluxo baseado em rotas**: cada etapa do checkout é uma rota separada, facilitando navegação e compartilhamento de links
- **Simulação realista**: simula comportamentos de diferentes métodos de pagamento (aprovação, falha, expiração)
- **Persistência local**: pedidos pagos são salvos no navegador para consulta posterior
- **UI moderna**: utiliza componentes shadcn/ui com TailwindCSS para uma interface profissional
- **Alternância de tema**: suporte completo a tema claro/escuro

## ✨ Recursos Principais

### Métodos de Pagamento Suportados

1. **Cartão de Crédito**

   - Formulário com validação de número, nome, validade e CVV
   - Aprovação probabilística (~97% de sucesso)

2. **PIX**

   - Exibição de QR Code
   - Código copia e cola
   - Aprovação probabilística (~95% de sucesso)

3. **Boleto Bancário**
   - Imagem grande do código de barras
   - Código do boleto selecionável e copiável com um clique
   - Contagem regressiva de expiração
   - Controle de simulação para desenvolvedores (forçar pago/falhou/expirado)

### Funcionalidades Adicionais

- **Carrinho de compras**: adicionar/remover produtos, calcular total
- **Autenticação simulada**: registro e login de usuários (dados salvos em memória)
- **Resumo do pedido**: sempre visível durante o checkout
- **Histórico de pedidos**: visualize todos os pedidos pagos em `/orders`
- **Copiar ID do pedido**: facilita compartilhamento e suporte
- **Responsivo**: funciona perfeitamente em desktop, tablet e mobile

## 🛠 Tecnologias Utilizadas

### Core

- **[Next.js 15](https://nextjs.org)** - Framework React com App Router
- **[React 19](https://react.dev)** - Biblioteca de interface
- **[TypeScript](https://www.typescriptlang.org)** - Tipagem estática

### UI & Estilização

- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com)** - Componentes reutilizáveis
- **[Lucide React](https://lucide.dev)** - Ícones modernos
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Gerenciamento de tema

### Estado & Validação

- **[Zustand](https://zustand-demo.pmnd.rs)** - Gerenciamento de estado com persistência
- **[Zod](https://zod.dev)** - Validação de schemas TypeScript-first
- **[React Hook Form](https://react-hook-form.com)** - Gerenciamento de formulários

## 🔄 Como Funciona

### Arquitetura Geral

O projeto segue uma arquitetura baseada em componentes com separação clara de responsabilidades:

```
Cliente (Navegador)
    ↓
Next.js App Router (Rotas)
    ↓
Componentes React (UI)
    ↓
Zustand Stores (Estado)
    ↓
LocalStorage (Persistência)
```

### Fluxo de Dados

1. **Usuário interage** → Componente React captura evento
2. **Validação** → Zod valida dados do formulário
3. **Atualização de estado** → Zustand atualiza store
4. **Persistência** → Store persiste automaticamente no localStorage
5. **Navegação** → Router do Next.js muda para próxima etapa
6. **Re-renderização** → Componentes consomem novo estado

## 📁 Estrutura do Projeto

```
payment-checkout/
├── src/
│   ├── app/                          # Páginas e layouts (App Router)
│   │   ├── layout.tsx               # Layout raiz da aplicação
│   │   ├── page.tsx                 # Página inicial (redireciona)
│   │   ├── auth/                    # Autenticação
│   │   │   └── page.tsx            # Login/Registro
│   │   ├── orders/                  # Histórico de pedidos
│   │   │   └── page.tsx            # Lista de pedidos pagos
│   │   └── (store)/                 # Grupo de rotas da loja
│   │       ├── layout.tsx          # Layout com header e cart
│   │       ├── catalog/            # Catálogo de produtos
│   │       ├── cart/               # Carrinho de compras
│   │       └── checkout/           # Fluxo de checkout
│   │           ├── page.tsx                    # Etapa 1: Dados de entrega
│   │           ├── orderSummary.tsx           # Componente de resumo
│   │           ├── payment/                    # Etapa 2: Seleção de pagamento
│   │           │   ├── page.tsx
│   │           │   ├── paymentMethodForm.tsx
│   │           │   └── methods/                # Etapa 3: UI específica de cada método
│   │           │       ├── creditCard/page.tsx
│   │           │       ├── pix/page.tsx
│   │           │       └── boleto/page.tsx
│   │           ├── review/                     # Etapa 4: Revisão do pedido
│   │           │   └── page.tsx
│   │           ├── status/                     # Etapa 5: Processamento
│   │           │   └── page.tsx
│   │           └── result/                     # Etapa 6: Resultado final
│   │               └── page.tsx
│   │
│   ├── components/              # Componentes reutilizáveis
│   │   ├── auth/               # Componentes de autenticação
│   │   ├── cart/               # Componentes do carrinho
│   │   ├── catalog/            # Componentes do catálogo
│   │   ├── checkout/           # Componentes do checkout
│   │   │   ├── CopyButton.tsx
│   │   │   ├── OrderCard.tsx
│   │   │   ├── ResultHeader.tsx
│   │   │   └── timer.tsx
│   │   └── ui/                 # Componentes shadcn/ui (não modificar)
│   │
│   ├── store/                   # Zustand stores
│   │   ├── authStore.ts        # Estado de autenticação
│   │   ├── cartStore.ts        # Estado do carrinho
│   │   ├── catalogStore.ts     # Estado do catálogo
│   │   └── checkoutStore.ts    # Estado do checkout (PRINCIPAL)
│   │
│   ├── lib/                     # Utilitários e helpers
│   │   ├── auth.ts             # Mock de autenticação
│   │   ├── mockApi.ts          # Mock de API de produtos
│   │   ├── orders.ts           # Persistência de pedidos
│   │   └── utils.ts            # Funções utilitárias
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── useCheckout.ts
│   │
│   ├── types/                   # Definições de tipos TypeScript
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   └── user.ts
│   │
│   └── styles/
│       └── globals.css          # Estilos globais
│
├── public/                      # Arquivos estáticos
├── .backups/                    # Backups automáticos (criados pelo assistente)
├── package.json                 # Dependências
├── tsconfig.json               # Configuração TypeScript
├── tailwind.config.ts          # Configuração Tailwind
├── next.config.ts              # Configuração Next.js
└── README.md                    # Este arquivo
```

## 🚀 Instalação e Execução

### Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** ou **yarn** ou **pnpm**
- Sistema operacional: Windows, macOS ou Linux

### Passo a Passo (Windows / PowerShell)

1. **Clone o repositório** (se aplicável)

```powershell
git clone <https://github.com/alissonsveen/payment-checkout>
cd payment-checkout
```

2. **Instale as dependências**

```powershell
npm install
```

Este comando instalará todas as bibliotecas necessárias listadas no `package.json`.

3. **Execute em modo desenvolvimento**

```powershell
npm run dev
```

O servidor iniciará na porta 3000. Você verá uma mensagem similar a:

```
  ▲ Next.js 15.5.6
  - Local:        http://localhost:3000
  - Ready in 2.1s
```

4. **Abra no navegador**

Acesse [http://localhost:3000](http://localhost:3000)

### Build para Produção

Para criar uma versão otimizada para produção:

```powershell
npm run build
```

Para iniciar o servidor de produção:

```powershell
npm run start
```

## 🛒 Fluxo de Checkout

### Visão Geral das Etapas

O checkout é dividido em 6 etapas sequenciais, cada uma com uma rota específica:

#### 1. Dados de Entrega (`/checkout`)

**Rota**: `/checkout`  
**Componente**: `src/app/(store)/checkout/page.tsx`

O usuário preenche:

- Nome completo
- CPF (obrigatório, validado)
- Telefone (obrigatório)
- Endereço completo (CEP, rua, número, bairro, cidade, estado)

**Validação**: Todos os campos são validados usando Zod antes de prosseguir.

**Estado salvo**: Dados salvos em `checkoutStore.shipping`

**Próxima etapa**: Redireciona para `/checkout/payment`

#### 2. Seleção de Método de Pagamento (`/checkout/payment`)

**Rota**: `/checkout/payment`  
**Componente**: `src/app/(store)/checkout/payment/page.tsx` e `paymentMethodForm.tsx`

Exibe três opções em cards elegantes:

- 💳 **Cartão de Crédito** - Aprovação imediata
- 📱 **PIX** - Pagamento instantâneo
- 📄 **Boleto** - Liberação em 1-3 dias

O usuário seleciona um método e clica em "Confirmar".

**Estado salvo**: Método escolhido salvo em `checkoutStore.paymentMethod` ("card" | "pix" | "boleto")

**Próxima etapa**: Redireciona para `/checkout/payment/methods/[metodo]`

#### 3. Interface Específica do Método (`/checkout/payment/methods/[metodo]`)

##### Cartão de Crédito (`/creditCard`)

**Componente**: `src/app/(store)/checkout/payment/methods/creditCard/page.tsx`

Formulário com:

- Número do cartão (16 dígitos)
- Nome do titular
- Data de validade (MM/AA)
- CVV (3 dígitos)

**Validação**: Zod valida formato dos campos (não valida cartão real).

**Comportamento**: Ao confirmar, define `paymentMethod = "card"` no store.

##### PIX (`/pix`)

**Componente**: `src/app/(store)/checkout/payment/methods/pix/page.tsx`

Exibe:

- QR Code fictício (imagem estática)
- Código copia e cola (string gerada)
- Botão para copiar código
- Resumo do pedido ao lado

**Comportamento**: Ao clicar em "Continuar", define `paymentMethod = "pix"` no store.

##### Boleto (`/boleto`)

**Componente**: `src/app/(store)/checkout/payment/methods/boleto/page.tsx`

Exibe:

- Imagem grande do código de barras
- Código do boleto em input somente leitura (seleciona ao clicar)
- Botão "Copiar código" com feedback visual
- Timer de contagem regressiva até expiração (10 minutos de exemplo)
- **[DEV]** Select para simular resultado (pago/falhou/expirado)

**Estado salvo**:

- `paymentMethod = "boleto"`
- `boletoExpiration` = timestamp de expiração
- `simulatedOutcome` = resultado forçado (se selecionado no dev mode)

**Próxima etapa**: Todas as três UIs redirecionam para `/checkout/review`

#### 4. Revisão do Pedido (`/checkout/review`)

**Rota**: `/checkout/review`  
**Componente**: `src/app/(store)/checkout/review/page.tsx`

Exibe:

- Dados de entrega completos
- Método de pagamento escolhido
- Resumo do pedido (OrderSummary no aside)
- Botão "Confirmar Pedido"

**Comportamento ao confirmar**:

1. Gera um ID único para o pedido (ex: "5D348224")
2. Salva em `checkoutStore.draftOrderId`
3. Define status como `"processando"`
4. Redireciona para `/checkout/status`

#### 5. Processamento (`/checkout/status`)

**Rota**: `/checkout/status`  
**Componente**: `src/app/(store)/checkout/status/page.tsx`

**Aparência**: Tela com spinner/loader e mensagem "Processando o pagamento..."

**Lógica interna** (executada automaticamente):

1. **Verifica simulação**: Se `simulatedOutcome` foi definido, usa esse resultado
2. **Verifica expiração de boleto**: Se método for boleto e timestamp atual > `boletoExpiration`, resultado = "expirado"
3. **Cálculo probabilístico** (se não houver override):

   - **Cartão**: 97% pago, 3% falhou
   - **PIX**: 95% pago, 5% falhou
   - **Boleto**: 85% pago, 15% falhou

4. **Aguarda 3 segundos** (simula processamento)
5. **Define status final**: "pago" | "falhou" | "expirado"
6. **Salva em**: `checkoutStore.status`
7. **Redireciona para**: `/checkout/result`

#### 6. Resultado Final (`/checkout/result`)

**Rota**: `/checkout/result`  
**Componente**: `src/app/(store)/checkout/result/page.tsx`

**Exibe** (depende do status):

##### Se `status === "pago"` ✅

- Ícone de sucesso (✓ verde)
- Mensagem: "Pagamento aprovado!"
- Card com ID do pedido e botão de copiar
- **Persistência**: Pedido é salvo automaticamente em `localStorage` com:
  - ID do pedido
  - Status: "pago"
  - Data/hora
  - Snapshot dos itens (id, nome, imagem, preço, quantidade)
  - Snapshot do endereço de entrega
- Botões:
  - "Ver Pedidos" → `/orders`
  - "Continuar Comprando" → `/` (limpa checkout store)

##### Se `status === "falhou"` ❌

- Ícone de erro (✗ vermelho)
- Mensagem: "Pagamento não autorizado"
- Botões:
  - "Ver Pedidos"
  - "Tentar outro método" → `/checkout/payment`

##### Se `status === "expirado"` ⏱️

- Ícone de relógio (⏱️ amarelo)
- Mensagem: "Pagamento expirado"
- Botões:
  - "Ver Pedidos"
  - "Gerar novo boleto" → `/checkout/payment`

## 📦 Gerenciamento de Estado

### Zustand Stores

O projeto usa **Zustand** com **persistência automática** via middleware `persist`. Isso significa que o estado sobrevive a recarregamentos da página.

#### `checkoutStore.ts` - Store Principal do Checkout

```typescript
interface CheckoutStore {
  // Dados de entrega
  shipping: {
    fullName: string
    cpf: string
    phone: string
    zipCode: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
  } | null

  // Método de pagamento escolhido
  paymentMethod: "card" | "pix" | "boleto" | null

  // ID temporário do pedido
  draftOrderId: string | null

  // Status atual do checkout
  status: "pendente" | "processando" | "pago" | "falhou" | "expirado"

  // [DEV] Override de resultado para testes
  simulatedOutcome: "pago" | "falhou" | "expirado" | null

  // Timestamp de expiração do boleto
  boletoExpiration: number | null

  // Funções para atualizar estado
  setShipping: (data) => void
  setPaymentMethod: (method) => void
  setDraftOrderId: (id) => void
  setStatus: (status) => void
  setSimulatedOutcome: (outcome) => void
  setBoletoExpiration: (timestamp) => void
  clearCheckout: () => void // Limpa todo o estado
}
```

**Persistência**: Salvo em `localStorage` com chave `checkout-storage`

#### `cartStore.ts` - Carrinho de Compras

Gerencia itens no carrinho:

- `items`: Array de produtos com quantidade
- `addItem(product, quantity)`
- `removeItem(productId)`
- `updateQuantity(productId, quantity)`
- `clearCart()`
- `total`: Valor total calculado

**Persistência**: Salvo em `localStorage` com chave `cart-storage`

#### `authStore.ts` - Autenticação

Gerencia usuário logado:

- `user`: Dados do usuário atual
- `isAuthenticated`: Boolean
- `login(data)`
- `register(data)`
- `logout()`

**Persistência**: Salvo em `localStorage` com chave `auth-storage`

## 💾 Persistência de Dados

### LocalStorage

O projeto usa `localStorage` para três finalidades:

#### 1. Persistência de Stores (Zustand)

Automática via middleware `persist`. Chaves usadas:

- `checkout-storage`
- `cart-storage`
- `auth-storage`

#### 2. Histórico de Pedidos

**Arquivo**: `src/lib/orders.ts`

```typescript
// Estrutura de um pedido salvo
interface StoredOrder {
  id: string                    // ID do pedido (ex: "5D348224")
  status: string                // "pago", "falhou", "expirado"
  date: number                  // Timestamp Unix
  items: StoredOrderItem[]      // Snapshot dos itens
  shipping: StoredShipping      // Snapshot do endereço
}

// Funções disponíveis
getOrders(): StoredOrder[]           // Retorna todos os pedidos
addOrder(order: StoredOrder): void   // Adiciona novo pedido (evita duplicatas)
clearOrders(): void                  // Limpa todo o histórico
```

**Chave no localStorage**: `orders`

**Quando é salvo**: Automaticamente na tela de resultado (`/checkout/result`) quando `status === "pago"`, via `useEffect`.

### Página de Pedidos (`/orders`)

**Rota**: `/orders`  
**Componente**: `src/app/orders/page.tsx`

**Funcionalidade**:

- Lê pedidos de `localStorage` via `getOrders()`
- Exibe lista com:
  - Miniaturas dos produtos (até 3, depois mostra "+N")
  - Número do pedido
  - Data e hora
  - Quantidade total de itens
  - Endereço de entrega (resumido)
  - Valor total
  - Status (badge colorido)
- Botões:
  - "Limpar" - remove todos os pedidos
  - "Continuar Comprando" - volta para home

## 🔧 Comandos Úteis

### Desenvolvimento

```powershell
npm run dev
```

Inicia servidor de desenvolvimento com hot-reload na porta 3000.

### Build de Produção

```powershell
npm run build
```

Cria build otimizado na pasta `.next/`. Processo inclui:

- Compilação TypeScript
- Otimização de assets
- Geração de páginas estáticas
- Minificação de código

### Iniciar Produção

```powershell
npm run start
```

Inicia servidor de produção (requer build prévio).

### Verificação de Tipos

```powershell
npx tsc --noEmit
```

Executa verificação TypeScript sem gerar arquivos. Útil para CI/CD.

### Lint

```powershell
npm run lint
```

Executa ESLint em todos os arquivos do projeto.

### Limpar Build

```powershell
Remove-Item -Recurse -Force .next
```

Remove pasta de build. Útil quando há problemas de cache.

## 📝 Notas Adicionais

### Dados Mockados

Este projeto NÃO conecta a APIs reais. Todos os dados são simulados:

- **Produtos**: Gerados em `src/lib/mockApi.ts`
- **Usuários**: Armazenados em memória em `src/lib/auth.ts`
- **Pagamentos**: Lógica probabilística em `src/app/(store)/checkout/status/page.tsx`

**Desenvolvido com Next.js + React + TypeScript**

_Última atualização: 27 de outubro de 2025_
