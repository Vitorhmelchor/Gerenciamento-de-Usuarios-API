# 📋 API de Gerenciamento de Usuários

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.18-blue.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)
![JWT](https://img.shields.io/badge/JWT-Auth-purple.svg)
![Swagger](https://img.shields.io/badge/Swagger-Docs-green.svg)
![Docker](https://img.shields.io/badge/Docker-Container-blue.svg)

Uma API completa para gerenciamento de usuários com sistema de autenticação seguro e controle de perfis administrativos.

## 📦 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🛠 Tecnologias](#-tecnologias)
- [🚀 Começando](#-começando)
- [⚙️ Configuração](#-configuração)
- [🐳 Docker](#-docker)
- [📚 API Documentation](#-api-documentation)
- [🧪 Testes](#-testes)
- [📋 Endpoints](#-endpoints)
- [🏗 Estrutura do Projeto](#-estrutura-do-projeto)
- [🤝 Contribuindo](#-contribuindo)

## ✨ Funcionalidades

- **🔐 Autenticação Segura**
  - Registro de usuários com validação
  - Login com JWT
  - Tokens com expiração configurável

- **👥 Gestão de Usuários**
  - CRUD completo de usuários
  - Perfis de administrador e usuário regular
  - Filtros e ordenação
  - Identificação de usuários inativos

- **🛡️ Sistema de Permissões**
  - Middleware de autenticação
  - Controle de acesso por roles
  - Validação de permissões

- **📊 Monitoramento**
  - Logs detalhados em arquivo
  - Health checks
  - Documentação interativa

## 🛠 Tecnologias

- **Backend**: Node.js + Express.js
- **Banco de Dados**: MySQL
- **Autenticação**: JWT + bcryptjs
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest + Supertest
- **Segurança**: Helmet + CORS
- **Containerização**: Docker + Docker Compose
- **Logging**: Sistema customizado com arquivos rotativos

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- MySQL 8.0+
- npm ou yarn
- (Opcional) Docker e Docker Compose

### Instalação

1. **Clone o repositório**
```bash
git clone (https://github.com/Vitorhmelchor/Gerenciamento-de-Usuarios-API)
cd gerenciamento-backend
```
2. **Instale as dependências**:
```bash
npm install
```
3. **Configure o ambiente**:
Crie um arquivo .env baseado no exemplo:
```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=user_management
JWT_SECRET=seu_jwt_secret_super_seguro
JWT_EXPIRES_IN=24h
```
4. **Configure o banco de dados**:
```bash
CREATE DATABASE user_management;
```
5. **Execute a aplicação**:
```bash
# Modo desenvolvimento (com nodemon):
npm run dev
# Modo produção:
npm start
```
## 🐳 Execução com Docker
```bash
# Build e execução dos containers
npm run docker:up
# Parar os containers
npm run docker:down
```
## 📚 Documentação da API
Acesse a documentação interativa no seu navegador após iniciar o servidor:
http://localhost:3000/api-docs
## 🧪 Testes
```bash
# Todos os testes
npm test
# Testes com watch mode
npm run test:watch
```
## 🔐 Endpoints Principais
- POST /auth/register - Registrar novo usuário
- POST /auth/login - Fazer login

**Usuários**:

- GET /users/profile - Obter próprio perfil
- PUT /users/profile - Atualizar próprio perfil
- GET /users - Listar todos usuários (apenas admin)
- GET /users/inactive - Listar usuários inativos (apenas admin)
- GET /users/:id - Obter usuário por ID (apenas admin)
- PUT /users/:id - Atualizar usuário (apenas admin)
- DELETE /users/:id - Excluir usuário (apenas admin)

## 📋 Exemplos de Uso
**A tabela users contém:**

id: Identificador único

- name: Nome completo
- email: Email único
- password: Senha criptografada
- role: Perfil (admin/user)
- createdAt: Data de criação
- updatedAt: Data de atualização
- lastLogin: Data do último login

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Desenvolvido com ❤️ por Vitor Hugo
