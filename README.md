# Daily Diet API

A **Daily Diet API** é uma solução moderna e robusta para gerenciamento e monitoramento da dieta diária. Desenvolvida em TypeScript, esta API foi projetada para oferecer uma experiência consistente e escalável, auxiliando usuários e desenvolvedores na criação de aplicativos que promovem um estilo de vida saudável.

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Execução do Projeto](#execução-do-projeto)

---

## Funcionalidades

- **Gerenciamento de Refeições:** Criação, listagem, atualização e remoção de refeições e lanches.
- **Métricas:** Métricas automáticas do consumo diário com base nos itens registrados.
- **Histórico de Consumo:** Registro e consulta do histórico de refeições, permitindo o acompanhamento de metas e hábitos.
- **Autenticação e Autorização:** Sistema de segurança para gerenciamento de usuários, garantindo que cada usuário visualize apenas seus próprios dados.
- **Relatórios Personalizados:** Geração de relatórios para análise do desempenho nutricional ao longo do tempo.

---

## Tecnologias Utilizadas

- **TypeScript:** Linguagem que garante maior robustez e escalabilidade.
- **Node.js:** Ambiente de execução para JavaScript no servidor.
- **Fastify:** Framework para criação de APIs RESTful.
- **Knex.js:** Query Builder para gerenciar migrations e interagir com o banco de dados.
- **Banco de Dados:** Configurável conforme sua necessidade (ex.: PostgreSQL, SQLite ou MySQL).
- **ESLint & Prettier:** Ferramentas para manter o código limpo e padronizado.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Um banco de dados de sua preferência (seja PostgreSQL, SQLite, etc.)

---

## Instalação e Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/emanuel-jose/daily-diet-api.git
   cd daily-diet-api

   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou, se preferir Yarn:
   yarn instal

   ```

3. **Configure as variáveis de ambiente:**

   - Renomeie o arquivo `.env.example` para `.env` e ajuste os parâmetros conforme sua configuração local.
   - Se necessário, configure também o arquivo `.env.test.example` para rodar os testes.

4. **Realize as migrations do banco de dados:**
   ```bash
   # utilizando o knex com o sript consigurado:
   npm run knex -- migrate:latest
   ```

## Execução do Projeto

Após a instalação e configuração, inicie o servidor:

```bash
    npm run dev
    # ou
    yarn dev
```

A API estará disponível no endereço configurado (geralmente http://localhost:3333).
