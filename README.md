# 🍞 API_SW — Sistema de Gestão para Padaria

> API RESTful desenvolvida em **Node.js + Express** com banco de dados **PostgreSQL** via **Sequelize ORM**, fornecendo o back-end completo para gerenciamento de uma padaria: controle de usuários, autenticação segura, catálogo de produtos e processamento de pedidos.

---

## 📋 Sumário

- [Descrição do Domínio](#-1-descrição-do-domínio-e-cenário)
- [Instalação e Execução](#-2-instalação-e-execução-local)
- [Rotas da API](#-3-tabela-de-rotas-da-api)
- [Documentação Swagger](#-documentação-swagger)
- [Decisões Técnicas](#-4-decisões-técnicas)

---

## 📖 1. Descrição do Domínio e Cenário

O domínio deste projeto é o de uma **Padaria**. Estabelecimentos alimentícios precisam digitalizar seu controle de estoque e vendas de forma segura e eficiente. A API centraliza as regras de negócio com as seguintes premissas:

- **Controle de Acesso (RBAC):** O sistema possui dois níveis de permissão (`flag_perm`). Administradores (`admin`) gerenciam o catálogo de produtos e o sistema como um todo. Clientes (`cliente`) podem visualizar produtos e realizar pedidos.
- **Segurança:** Todas as senhas são criptografadas antes de serem salvas no banco de dados. Rotas sensíveis são protegidas por autenticação via **Token JWT** (JSON Web Token).
- **Arquitetura Isolada:** O projeto segue a separação de responsabilidades em camadas:
  - **Controllers** — lidam com requisições HTTP
  - **Services** — lógica de negócio e segurança
  - **DAOs** — acesso a dados e persistência

---

## ⚙️ 2. Instalação e Execução Local

### Pré-requisitos

- [Node.js](https://nodejs.org/) v14 ou superior
- Acesso à Internet (o banco de dados está hospedado na nuvem)

### Passo a Passo

**1. Clone o repositório e acesse a pasta:**

```bash
git clone <url-do-repositorio>
cd API_SW
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto usando o `.env.example` como base.

```env
DATABASE_URL=sua_url_do_banco
JWT_SECRET=seu_secret
```

> 🚨 **Nota para Avaliação:** O banco de dados está hospedado no **Neon.tech** com tabelas já sincronizadas. As credenciais reais (`DATABASE_URL` e `JWT_SECRET`) foram enviadas no portal de entrega da disciplina. Basta colá-las no seu `.env`.

**4. Inicie o servidor:**

```bash
npm start
```

O servidor iniciará na porta **3000** com sincronização automática via Sequelize.

---

## 🗺️ 3. Tabela de Rotas da API

| Método | Endpoint | Descrição | Autenticação | Nível Exigido |
|--------|----------|-----------|:------------:|:-------------:|
| `POST` | `/api/auth/register` | Cadastra um novo usuário no sistema | ❌ Não | Nenhum |
| `POST` | `/api/auth/login` | Autentica o usuário e retorna o Token JWT | ❌ Não | Nenhum |
| `GET` | `/api/produtos` | Lista o catálogo de produtos da padaria | ✅ Sim | `cliente` ou `admin` |
| `POST` | `/api/produtos` | Cadastra um novo produto no estoque | ✅ Sim | `admin` |
| `PUT` | `/api/produtos/{id}` | Atualiza dados (preço, nome) de um produto | ✅ Sim | `admin` |
| `DELETE` | `/api/produtos/{id}` | Remove um produto do catálogo | ✅ Sim | `admin` |
| `GET` | `/api/pedidos` | Lista o histórico de pedidos | ✅ Sim | `admin` |
| `POST` | `/api/pedidos` | Registra um novo pedido para o cliente logado | ✅ Sim | `cliente` |

---

## 📚 Documentação Swagger

Com o servidor em execução, acesse a documentação interativa em:

```
http://localhost:3000/api-docs
```

---

## 🔍 4. Decisões Técnicas

### 1. Hospedagem de Banco de Dados — Neon.tech (PostgreSQL Serverless)

Em vez de depender de instâncias locais do PostgreSQL, optou-se pelo **Neon.tech**. A plataforma oferece uma arquitetura serverless que separa armazenamento e computação, reduzindo custo, garantindo alta disponibilidade e facilitando a avaliação — o avaliador conecta-se diretamente à base na nuvem sem precisar executar scripts SQL localmente.

### 2. Segurança e Autenticação — Bcrypt + JWT

O armazenamento de senhas em texto puro representa uma vulnerabilidade crítica (**CWE-256**). Para mitigar isso:

- **Bcrypt** — aplica hashing com salt dinâmico antes de persistir a senha
- **JWT (JSON Web Token)** — gerencia sessões de forma stateless. Após o login, a API emite um token assinado contendo a permissão (`flag_perm`) do usuário. Um middleware customizado intercepta e valida esse token, autorizando ou bloqueando o acesso com base no conceito de **Role-Based Access Control (RBAC)**

### 3. Padrão Arquitetural — DAO (Data Access Object)

A separação de conceitos (**Separation of Concerns**) foi aplicada com o padrão DAO, que isola:

| Camada | Responsabilidade |
|--------|-----------------|
| **Controllers** | Tratamento de requisições e respostas HTTP |
| **Services** | Regras de negócio e validações |
| **DAOs** | Comunicação com o ORM (Sequelize) |

Essa arquitetura facilita manutenção e testes. Uma eventual migração do Sequelize para o Prisma, por exemplo, impactaria **exclusivamente** os arquivos DAO, sem quebrar a lógica de negócio ou as rotas da API.

---

<p align="center">Desenvolvido com ☕ e 🍞</p>