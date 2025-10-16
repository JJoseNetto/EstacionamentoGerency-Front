# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Parkia TST Web

  Aplicação frontend do teste técnico "Parkia" — construída com React, TypeScript, Vite e TailwindCSS.

  Este README descreve como configurar, executar e entender a estrutura básica do projeto.

  ## Sumário

  - Pré-requisitos
  - Instalação
  - Scripts úteis
  - Execução (dev / build / preview)
  - Estrutura do projeto
  - Bibliotecas utilizadas
  - O que foi implementado
  - Boas práticas e troubleshooting
  - Próximos passos sugeridos

  ---

  ## Pré-requisitos

  - Node.js (recomendo v18 LTS ou superior)
  - npm (vem com o Node) — também é possível usar yarn ou pnpm

  No Windows, utilize PowerShell (os exemplos abaixo usam esse shell). Caso encontre problemas de permissão, abra o terminal como administrador.

  ## Instalação

  No diretório raiz do projeto execute:

  ```powershell
  npm install
  ```

  Isso instalará as dependências declaradas em `package.json`.

  ## Scripts úteis (em `package.json`)

  - `npm run dev` — inicia o servidor de desenvolvimento (Vite) com HMR.
  - `npm run build` — compila TypeScript (`tsc -b`) e gera a build de produção (`vite build`).
  - `npm run preview` — serve a build de produção localmente (`vite preview`).
  - `npm run lint` — executa o ESLint no projeto.

  Exemplo de uso (PowerShell):

  ```powershell
  npm run dev
  npm run build
  npm run preview
  npm run lint
  ```

  ## Como rodar em desenvolvimento

  1. Instale dependências: `npm install`.
  2. Inicie o servidor de desenvolvimento:

  ```powershell
  npm run dev
  ```

  Abra `http://localhost:5173` no navegador (porta padrão do Vite).

  ## Build e preview de produção

  ```powershell
  npm run build
  npm run preview
  ```

  ## Estrutura do projeto (resumo)

  - `index.html` — entrada HTML.
  - `vite.config.ts` — configuração do Vite.
  - `tsconfig.*.json` — configurações do TypeScript.
  - `src/` — código fonte:
    - `main.tsx`, `App.tsx` — ponto de entrada e componente raiz.
    - `index.css` — estilos (Tailwind configurado no projeto).
    - `api/` — integração com backend (`api.ts`, `auth.ts`, `estacionamentos.ts`, `vagas.ts`, `users.ts`, `hooks.ts`) e `schema/` (Zod schemas).
    - `components/` — componentes reutilizáveis, incluindo `ui/` (primitives e wrappers) e `layouts/`.
    - `pages/` — páginas (autenticação, dashboard, etc.).
    - `routes/` — componentes de rota (`ProtectedRoute.tsx`, `PublicRoute.tsx`).

  ## Bibliotecas utilizadas

  As dependências e devDependencies estão declaradas em `package.json`. Abaixo estão as principais bibliotecas e seus propósitos.

  Dependencies (runtime):

  - react, react-dom — biblioteca de UI.
  - axios — cliente HTTP para chamadas à API.
  - react-router-dom — roteamento no cliente.
  - react-hook-form — gerenciamento de formulários.
  - @hookform/resolvers — integração entre react-hook-form e validadores (ex.: Zod).
  - zod — validação de schemas e dados.
  - @tanstack/react-query — gerenciamento de fetch/caching e estado assíncrono.
  - tailwindcss — framework utilitário CSS.
  - @tailwindcss/vite — integração do Tailwind com o Vite.
  - input-otp — componente de campo OTP (código de verificação).
  - lucide-react — biblioteca de ícones.
  - sonner — notificações/toasts.
  - clsx — utilitário para composição condicional de classes CSS.
  - class-variance-authority — utilitário para gerenciar variações de classes em componentes.
  - tailwind-merge — mescla classes Tailwind evitando duplicatas conflitantes.
  - next-themes — gerenciamento de temas (light/dark).

  Radix primitives (UI acessível):

  - @radix-ui/react-alert-dialog, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu, @radix-ui/react-label, @radix-ui/react-select, @radix-ui/react-separator, @radix-ui/react-slot, @radix-ui/react-tabs, @radix-ui/react-tooltip — primitives para compor componentes acessíveis (modais, menus, selects, tooltips etc.).

  DevDependencies (ferramentas de desenvolvimento):

  - vite — bundler e dev server.
  - typescript — tipagem e compilação (`tsc -b`).
  - eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, typescript-eslint — ferramentas de lint e regras para qualidade do código.
  - @types/node, @types/react, @types/react-dom — tipos TypeScript.
  - tw-animate-css — utilitários de animação compatíveis com Tailwind.

  Para ver as versões exatas, consulte `package.json`.

  ## O que foi adicionado / implementado

  Principais funcionalidades e arquivos adicionados no projeto:

  - Rotas públicas/protegidas: `src/routes/ProtectedRoute.tsx` e `src/routes/PublicRoute.tsx`.
  - Módulos de API em `src/api/` para autenticação, estacionamentos, vagas e usuários (ex.: `auth.ts`, `estacionamentos.ts`, `vagas.ts`, `users.ts`).
  - Schemas de validação com Zod em `src/api/schema/` (ex.: `auth.schema.ts`, `estacionamento.schema.ts`).
  - Páginas de autenticação (`LoginPage.tsx`, `RegisterPage.tsx`) integradas com `react-hook-form` + Zod.
  - Dashboard com componentes para gerenciar estacionamentos e vagas: modais, sheets, listas e ações de CRUD.
  - Biblioteca de componentes UI (`src/components/ui/`) baseada em Radix + Tailwind (botões, inputs, selects, dialogs, etc.).

  Esses itens compõem a base da aplicação: autenticação, chamadas à API, validação de formulários e UI reutilizável.

  ## Boas práticas e recomendações

  - Valide entradas e responses com Zod sempre que possível.
  - Use `@tanstack/react-query` para gerenciamento de cache e sincronização com o servidor.
  - Execute o lint regularmente: `npm run lint`.
  - Configure seu editor para executar ESLint/format on save.

  ## Troubleshooting

  - Falha em `npm install`: verifique a versão do Node; remova `node_modules` e `package-lock.json` e execute `npm install` novamente.
  - Porta em uso ao iniciar o Vite: rode `npm run dev -- --port <porta>` para usar outra porta ou ajuste `vite.config.ts`.
  - Erros de lint: rode `npm run lint` e corrija conforme as mensagens.

  ## Próximos passos sugeridos (posso implementar)

  - Gerar `CONTRIBUTING.md` com diretrizes de contribuição e convenções de commit.
  - Adicionar scripts úteis em `package.json`: `format`, `type-check`, `test`.
  - Criar `.env.example` com variáveis de ambiente esperadas.

  Se quiser que eu implemente algum desses itens, indique qual e eu atualizo o repositório.

    npm install
    ```

    ## Scripts disponíveis

    Os scripts definidos em `package.json` são:

    - `npm run dev` — inicia o servidor de desenvolvimento (Vite) com hot-reload.
    - `npm run build` — roda `tsc -b` para compilar TypeScript e `vite build` para gerar a build de produção.
    - `npm run preview` — serve a build de produção localmente (`vite preview`).
    - `npm run lint` — executa o ESLint sobre o código do projeto.

    Exemplos de uso (PowerShell):

    ```powershell
    npm run dev
    npm run build
    npm run preview
    npm run lint
    ```

    ## Como rodar em desenvolvimento

    1. Instale dependências: `npm install`.
    2. Inicie o servidor de desenvolvimento:

    ```powershell
    npm run dev
    ```

    O Vite normalmente abre em `http://localhost:5173`. Se a porta estiver em uso, o terminal exibirá outra porta.

    ## Como gerar e testar a build de produção

    ```powershell
    npm run build
    npm run preview
    ```

    ## Estrutura do projeto (resumo)

    - `index.html` — raiz HTML.
    - `vite.config.ts` — configuração do Vite.
    - `tsconfig.*.json` — configurações do TypeScript.
    - `src/` — código-fonte:
      - `main.tsx`, `App.tsx` — ponto de entrada e componente raiz.
      - `index.css` — estilos (Tailwind configurado no projeto).
      - `api/` — módulos de integração com backend (`api.ts`, `auth.ts`, `estacionamentos.ts`, `vagas.ts`, `users.ts`, `hooks.ts`) e `schema/` com validações Zod.
      - `components/` — componentes UI reutilizáveis, incluindo `ui/` (primitives e wrappers) e `layouts/`.
      - `pages/` — páginas (autenticação, dashboard etc.) e seus componentes.
      - `routes/` — componentes de rota (`ProtectedRoute.tsx`, `PublicRoute.tsx`).

    Essa organização favorece separação de responsabilidades: lógica de API, validação, componentes UI e páginas.

    ## Bibliotecas utilizadas

    Segue a lista das dependências presentes em `package.json` (com uma breve descrição do propósito de cada uma):

    Dependências principais (runtime):

    - react, react-dom: biblioteca UI.
    - axios: cliente HTTP para chamadas à API.
    - react-router-dom: roteamento do lado do cliente.
    - react-hook-form: gerenciamento de formulários reativos.
    - @hookform/resolvers: integrações entre react-hook-form e validadores (ex.: Zod).
    - zod: validação de schemas e dados.
    - @tanstack/react-query: gerenciamento de fetch/caching e estado assíncrono.
    - tailwindcss: framework utilitário CSS usado no projeto.
    - @tailwindcss/vite: integração do Tailwind com o Vite.
    - input-otp: componente para campos OTP (código de verificação).
    - lucide-react: biblioteca de ícones.
    - sonner: notificações/toasts.
    - clsx: utilitário para composição condicional de classes CSS.
    - class-variance-authority: utilitário para gerenciar variações de classes em componentes.
    - tailwind-merge: ajuda a mesclar classes Tailwind evitando duplicatas conflitantes.
    - next-themes: gerenciador de temas (light/dark) no cliente.

    Radix primitives (UI acessível):

    - @radix-ui/react-alert-dialog, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu, @radix-ui/react-label, @radix-ui/react-select, @radix-ui/react-separator, @radix-ui/react-slot, @radix-ui/react-tabs, @radix-ui/react-tooltip: primitives acessíveis usadas para construir componentes UI (modais, selects, tooltips etc.).

    DevDependencies (ferramentas de desenvolvimento):

    - vite: bundler e dev server (listado como devDependency em `package.json`).
    - typescript: tipagem estática e compilação (usado em `npm run build`).
    - eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, typescript-eslint: ferramentas de lint para manter a qualidade do código.
    - @types/node, @types/react, @types/react-dom: tipos TypeScript para ambiente Node/React.
    - tw-animate-css: utilitários de animação compatíveis com Tailwind.

    As versões exatas estão listadas em `package.json`.

    ## O que foi implementado / adicionado no projeto

    Principais funcionalidades e arquivos adicionados:

    - Roteamento e proteção de rotas: `src/routes/ProtectedRoute.tsx` e `src/routes/PublicRoute.tsx`.
    - Módulos de API em `src/api/` para autenticação, estacionamentos, vagas e usuários (ex.: `auth.ts`, `estacionamentos.ts`, `vagas.ts`, `users.ts`).
    - Schemas de validação com Zod em `src/api/schema/` (ex.: `auth.schema.ts`, `estacionamento.schema.ts`).
    - Páginas de autenticação (`LoginPage.tsx`, `RegisterPage.tsx`) com integração `react-hook-form` + Zod.
    - Dashboard com componentes para gerenciar estacionamentos/vagas, incluindo modais, sheets e pequenos widgets.
    - Biblioteca de componentes UI em `src/components/ui/`, baseada em primitives Radix + Tailwind para composição de interface acessível e reutilizável.

    Esses módulos fornecem a base para autenticação, chamadas à API, validação e uma UI consistente.

    ## Boas práticas e recomendações

    - Use Zod para validar tanto inputs de formulários quanto responses de API quando necessário.
    - Integre react-query (`@tanstack/react-query`) para gerenciamento de cache e sincronização com o servidor.
    - Rode o ESLint (`npm run lint`) regularmente e configure seu editor para aplicar formatação/lint on save.
    - Ao atualizar dependências major, revise breaking changes e faça testes manuais no fluxo crítico (autenticação, CRUD de vagas/estacionamentos).

    ## Troubleshooting (problemas comuns)

    - Erro ao instalar dependências: verifique a versão do Node; se necessário, remova `node_modules` e `package-lock.json` e rode `npm install` novamente.
    - Porta em uso ao iniciar o Vite: especifique outra porta (`npm run dev -- --port 3000`) ou ajuste `vite.config.ts`.
    - Problemas de lint: rode `npm run lint` e siga as indicações do ESLint.

    ## Próximos passos que posso ajudar a implementar

    - Gerar um `CONTRIBUTING.md` com diretrizes de contribuição e convenções de commit.
    - Adicionar scripts úteis no `package.json`, como `format`, `type-check`, `test`.
    - Criar um checklist para PRs e um arquivo `.env.example` com variáveis de ambiente esperadas.

    Se quiser que eu implemente algum desses pontos, diga qual preferir e eu faço as mudanças.


    ## O que foi adicionado/implementado neste projeto

    Resumo das principais implementações e arquivos adicionados durante o desenvolvimento:

    - Estrutura de rotas e proteção de rotas (`routes/ProtectedRoute.tsx`, `routes/PublicRoute.tsx`).
    - Módulos de API em `src/api/` para autenticação e gerenciamento de estacionamentos/vagas/usuários (`auth.ts`, `estacionamentos.ts`, `vagas.ts`, `users.ts`).
    - Schemas de validação com Zod em `src/api/schema/` (ex.: `auth.schema.ts`, `estacionamento.schema.ts`).
    - Páginas de autenticação com formulários (login/registro) e integração com react-hook-form e Zod.
    - Painel (dashboard) com componentes para gerenciamento de vagas e estacionamentos, incluindo modais, sheets e componentes reutilizáveis.
    - Biblioteca de componentes UI (`src/components/ui/`) com controles acessíveis (Radix) e wrappers estilizados para o sistema de design.

    Esses itens representam a base da aplicação: autenticação, chamadas a APIs, validação de formulário, UI acessível e organização por páginas/componentes.

    ## Boas práticas e notas

    - Mantenha suas dependências atualizadas com cautela. Ao atualizar major versions, verifique breaking changes.
    - Para adicionar uma nova API, crie um arquivo em `src/api/` e exporte funções que retornem promessas (utilize `axios` ou `react-query` para fetch/caching).
    - Valide dados de entrada com Zod e integre com react-hook-form via `@hookform/resolvers`.

    ## Troubleshooting

    - Erro ao rodar `npm install`: verifique sua versão do Node e remova `node_modules` + `package-lock.json` e tente novamente.
    - Porta em uso ao iniciar o Vite: especifique outra porta via `vite --port <porta>` ou ajuste o `vite.config.ts`.
    - Problemas de lint: rode `npm run lint` e corrija os avisos/erros indicados.

    ## Contribuindo

    Abra um PR com mudanças pequenas e claras. Prefira commits por recurso/bugfix e descreva o que foi alterado.
