<!--START_SECTION:header-->
<div align="center">
  <p align="c## 💻 Sobre o Projeto

Esta é uma **API RESTful completa** desenvolvida para fornecer utilitários essenciais para e-commerce. O projeto foi transformado de uma aplicação CLI simples em uma API robusta e escalável que oferece:

### 🔧 Funcionalidades Principais

#### 📱 Geração de QR Codes
- **QR Codes Genéricos**: Para qualquer URL ou texto
- **QR Codes de Produtos**: Específicos para produtos de e-commerce com metadados
- **Geração em Lote**: Múltiplos QR codes simultaneamente
- **Customização Avançada**: Cores, tamanhos, níveis de correção de erro

#### 🔐 Geração de Senhas Seguras
- **Senhas Personalizáveis**: Controle total sobre caracteres e comprimento
- **Senhas para E-commerce**: Templates específicos (cliente, admin, API keys, temporárias)
- **Geração em Lote**: Múltiplas senhas simultaneamente
- **Análise de Força**: Validação e recomendações de segurança

#### 🚀 Recursos da API
- **RESTful Design**: Endpoints bem estruturados e padronizados
- **Rate Limiting**: Proteção contra abuso com 100 req/15min por IP
- **Validação Robusta**: Validação completa de entrada com Joi
- **Tratamento de Erros**: Sistema robusto de tratamento e logging
- **CORS & Security**: Headers de segurança com Helmet
- **Documentação Integrada**: Endpoint `/health` com documentação completa

### 🏗️ Arquitetura

```
src/
├── server.js              # Servidor principal Express
├── routes/                # Definição das rotas
│   ├── qrcode.js         # Rotas para QR codes
│   ├── password.js       # Rotas para senhas
│   └── health.js         # Health check e docs
├── controllers/           # Lógica de negócio
│   ├── qrCodeController.js
│   └── passwordController.js
├── middleware/           # Middlewares customizados
│   ├── validation.js     # Validação de entrada
│   └── errorHandler.js   # Tratamento de erros
└── services/            # Serviços de negócio
    └── password/
        └── passwordService.js
```er">
    <img 
      alt="DIO Education" 
      src="https://raw.githubusercontent.com/digitalinnovationone/template-github-trilha/main/.github/assets/logo.webp" 
      width="100px" 
    />
    <h1>🛒 E-commerce Utilities API</h1>
    <p>API RESTful completa para utilitários de e-commerce</p>
  </p>
</div>
<!--END_SECTION:header-->

<p align="center">
  <img src="https://img.shields.io/static/v1?label=DIO&message=Education&color=E94D5F&labelColor=202024" alt="DIO Project" />
  <img src="https://img.shields.io/static/v1?label=Nivel&message=Intermediario&color=E94D5F&labelColor=202024" alt="Nivel">
  <img src="https://img.shields.io/static/v1?label=Versão&message=2.0.0&color=00D4AA&labelColor=202024" alt="Version">
  <img src="https://img.shields.io/static/v1?label=Status&message=Ativo&color=00D4AA&labelColor=202024" alt="Status">
</p>

<!--  -->
<table align="center">
<thead>
  <tr>
    <td>
        <p align="center">Expert</p>
        <a href="https://github.com/felipeAguiarCode">
        <img src="https://avatars0.githubusercontent.com/u/37452836?v=3&s=115" alt="@felipeAguiarCode"><br>
      </a>
    </td>
    <td colspan="3">
    <p>🎉 10y+ em sistemas comerciais com .NET C# e NODE.JS.
      <br/>
     🌟 Desenvolvedor fullstack - Coordenador de educação na DIO
      <br/>
    👨‍💻 Foco em front-ends SPA com React, Angular e Vue.js
    </p>
      <a 
      href="https://www.linkedin.com/in/felipe-me/" 
      align="center">
           <img 
            align="center" 
            alt="Material de Apoio" 
            src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
            >
        </a>
        <a href="https://www.instagram.com/felipeaguiar.exe/" target="_blank">
            <img 
              align="center" 
              alt="Instagram" 
              src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"
            >
        </a>
    </td>
  </tr>
</thead>
</table>
<!--  -->

<br/>

## � Sobre o Projeto

A **E-commerce Utilities API** é uma API RESTful moderna desenvolvida em Node.js que oferece um conjunto completo de ferramentas essenciais para e-commerce. A aplicação foi projetada com arquitetura escalável e seguindo as melhores práticas de desenvolvimento.

### ✨ Funcionalidades Principais

- **🔗 Geração de QR Codes**: Crie QR codes personalizados para produtos, URLs e dados diversos
- **🔐 Gerador de Senhas Seguras**: Gere senhas robustas para diferentes tipos de usuários
- **📦 Processamento em Lote**: Processe múltiplos QR codes ou senhas simultaneamente
- **🛡️ Segurança Avançada**: Rate limiting, validação de dados e headers de segurança
- **📊 Monitoramento**: Logs detalhados e health checks

### 🎯 Casos de Uso para E-commerce

- **QR Codes de Produtos**: Gere códigos para facilitar o acesso móvel aos produtos
- **Senhas de Usuários**: Crie senhas seguras para clientes, administradores e APIs
- **Links de Compartilhamento**: Transforme URLs em QR codes para campanhas
- **Autenticação Temporária**: Gere senhas temporárias para recuperação de conta

## 🛠️ Tecnologias Utilizadas

- **Node.js** (18+) - Runtime JavaScript
- **Express.js** - Framework web
- **QRCode** - Geração de QR codes
- **Joi** - Validação de dados
- **Helmet** - Headers de segurança
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - Logging de requisições
- **Express Rate Limit** - Limitação de taxa

## 📚 Pré-requisitos de Habilidades e Níveis de Conhecimento

Para compreender e contribuir com este projeto, é recomendado ter conhecimento em:

### Básico
- Lógica de programação
- JavaScript (ES6+)
- Node.js e NPM
- Conceitos de API REST
- JSON e HTTP

### Intermediário
- Express.js framework
- Middleware e routing
- Validação de dados
- Tratamento de erros
- Variáveis de ambiente (.env)
- Segurança em APIs (CORS, Rate Limiting, Helmet)

### Opcional
- Docker e containerização
- Testes automatizados
- CI/CD pipelines
- Monitoramento e logging

## 🛠️ Tecnologias Utilizadas

### Core
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **ES Modules** - Sistema de módulos moderno

### Utilitários
- **QRCode** - Geração de QR codes
- **UUID** - Geração de IDs únicos
- **Joi** - Validação de schemas

### Segurança & Performance
- **Helmet** - Headers de segurança
- **CORS** - Cross-Origin Resource Sharing
- **Express Rate Limit** - Rate limiting
- **Morgan** - Logging de requisições

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd projeto-qrcode
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

### 4. Execute a aplicação

#### Modo Desenvolvimento (com auto-reload)
```bash
npm run dev
```

#### Modo Produção
```bash
npm start
```

A API estará disponível em: `http://localhost:3000`

## 📖 Documentação da API

### Health Check
```http
GET /api/v1/health
```

### Gerar QR Code Genérico
```http
POST /api/v1/qrcode/generate
Content-Type: application/json

{
  "text": "https://meusite.com/produto/123",
  "options": {
    "width": 300,
    "margin": 2,
    "color": {
      "dark": "#000000",
      "light": "#FFFFFF"
    }
  }
}
```

### Gerar QR Code de Produto
```http
POST /api/v1/qrcode/product
Content-Type: application/json

{
  "productId": "PROD123",
  "productName": "Smartphone XYZ",
  "price": 999.99,
  "category": "Eletrônicos",
  "storeUrl": "https://minhaloja.com"
}
```

### Gerar Senha Segura
```http
POST /api/v1/password/generate
Content-Type: application/json

{
  "length": 12,
  "includeUppercase": true,
  "includeLowercase": true,
  "includeNumbers": true,
  "includeSpecialChars": true
}
```

### Gerar Senha para E-commerce
```http
POST /api/v1/password/ecommerce
Content-Type: application/json

{
  "type": "admin",
  "customLength": 16
}
```

**Documentação completa**: `GET /api/v1/health` ou consulte `/docs/api-documentation.md`

## ⚡ Instalação e Execução

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd projeto-qrcode
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` conforme necessário:
```env
PORT=3000
NODE_ENV=development
PASSWORD_LENGTH=12
UPPERCASE_LETTERS=true
LOWERCASE_LETTERS=true
NUMBERS=true
SPECIAL_CHARACTERS=true
```

### 4. Execute a aplicação

**Modo de desenvolvimento (com watch):**
```bash
npm run dev
```

**Modo de produção:**
```bash
npm start
```

A API estará disponível em: `http://localhost:3000`

## 📖 Documentação da API

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints Principais

#### Health Check
```http
GET /api/v1/health
```

#### QR Code - Geração Genérica
```http
POST /api/v1/qrcode/generate
Content-Type: application/json

{
  "text": "https://meusite.com/produto/123",
  "options": {
    "width": 300,
    "margin": 2,
    "color": {
      "dark": "#000000",
      "light": "#FFFFFF"
    }
  }
}
```

#### QR Code - Produto E-commerce
```http
POST /api/v1/qrcode/product
Content-Type: application/json

{
  "productId": "PROD123",
  "productName": "Smartphone XYZ",
  "price": 999.99,
  "category": "Eletrônicos",
  "storeUrl": "https://minhaloja.com"
}
```

#### Senha - Geração Segura
```http
POST /api/v1/password/generate
Content-Type: application/json

{
  "length": 12,
  "includeUppercase": true,
  "includeLowercase": true,
  "includeNumbers": true,
  "includeSpecialChars": true
}
```

#### Senha - E-commerce Específica
```http
POST /api/v1/password/ecommerce
Content-Type: application/json

{
  "type": "admin",
  "userRole": "super_admin",
  "customLength": 16
}
```

> 📋 **Documentação Completa**: Consulte [docs/api-documentation.md](docs/api-documentation.md) para mais detalhes

## 🏗️ Arquitetura do Projeto

```
src/
├── controllers/         # Controladores da aplicação
│   ├── qrCodeController.js
│   └── passwordController.js
├── middleware/          # Middlewares customizados
│   ├── errorHandler.js
│   └── validation.js
├── routes/             # Definição das rotas
│   ├── health.js
│   ├── qrcode.js
│   └── password.js
├── services/           # Lógica de negócio
│   └── password/
│       └── passwordService.js
└── server.js          # Ponto de entrada da aplicação
```

## 🔒 Segurança

A API implementa várias camadas de segurança:

- **Rate Limiting**: Máximo de 100 requisições por 15 minutos por IP
- **Headers de Segurança**: Helmet.js para proteção contra vulnerabilidades comuns
- **Validação de Dados**: Joi para validação rigorosa de entrada
- **CORS Configurado**: Controle de origens permitidas
- **Tratamento de Erros**: Logs detalhados sem exposição de dados sensíveis

## 🚀 Funcionalidades Avançadas

### QR Codes
- ✅ Geração em múltiplos formatos (Data URL, SVG)
- ✅ Customização completa (cores, tamanho, margem)
- ✅ QR codes específicos para produtos e e-commerce
- ✅ Processamento em lote até 50 itens
- ✅ Níveis de correção de erro configuráveis

### Senhas
- ✅ Algoritmos de geração criptograficamente seguros
- ✅ Análise de força da senha
- ✅ Tipos específicos (cliente, admin, API key, temporária)
- ✅ Exclusão de caracteres similares
- ✅ Recomendações de segurança personalizadas

## 🧪 Testes

Execute os testes (quando disponíveis):
```bash
npm test
```

## 📈 Monitoramento

A API inclui:
- Logs estruturados com Morgan
- Health checks em `/api/v1/health`
- Métricas de rate limiting
- Tratamento centralizado de erros

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Roadmap Futuro

- [ ] Autenticação JWT
- [ ] Banco de dados para histórico
- [ ] Dashboard de analytics
- [ ] Integração com serviços de e-mail
- [ ] Webhooks para notificações
- [ ] Documentação Swagger/OpenAPI
## 🎯 Casos de Uso para E-commerce

### 🏪 Para Lojistas
- **QR Codes de Produtos**: Facilita acesso rápido às páginas de produtos
- **QR Codes de Pagamento**: Integração com gateways de pagamento
- **Senhas de Admin**: Geração segura para painéis administrativos
- **API Keys**: Criação de chaves para integrações

### 👥 Para Desenvolvedores
- **Integração Simples**: API RESTful fácil de integrar
- **Batch Processing**: Geração em lote para catálogos grandes
- **Customização**: Controle total sobre aparência e segurança
- **Escalabilidade**: Rate limiting e tratamento robusto de erros

### 🛡️ Segurança
- **Rate Limiting**: Proteção contra abuso
- **Validação**: Entrada sanitizada e validada
- **Headers Seguros**: Helmet.js para proteção
- **Senhas Robustas**: Análise de força e recomendações

## 🧪 Exemplos de Teste

### Testando a API com curl

```bash
# Health check
curl http://localhost:3000/api/v1/health

# Gerar QR Code
curl -X POST http://localhost:3000/api/v1/qrcode/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "https://exemplo.com"}'

# Gerar senha
curl -X POST http://localhost:3000/api/v1/password/generate \
  -H "Content-Type: application/json" \
  -d '{"length": 16, "includeSpecialChars": true}'
```

## 🚀 Deploy e Produção

### Variáveis de Ambiente de Produção
```env
NODE_ENV=production
PORT=3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Autenticação JWT
- [ ] Banco de dados para histórico
- [ ] Dashboard web
- [ ] Webhooks
- [ ] Métricas e analytics
- [ ] Testes automatizados
- [ ] Docker Compose

## 🎓 Aprendizados

Após trabalhar com este projeto, você terá experiência em:

- ✅ Desenvolvimento de APIs RESTful robustas
- ✅ Arquitetura em camadas (routes, controllers, services)
- ✅ Validação e tratamento de erros
- ✅ Segurança em aplicações web
- ✅ Rate limiting e proteção contra abuso
- ✅ Documentação de APIs
- ✅ Boas práticas com Express.js
- ✅ Geração de QR codes e senhas seguras
- ✅ Estruturação de projetos Node.js escaláveis

<!--START_SECTION:footer-->

<br />
<br />

<p align="center">
  <a href="https://www.dio.me/" target="_blank">
    <img align="center" src="https://raw.githubusercontent.com/digitalinnovationone/template-github-trilha/main/.github/assets/footer.png" alt="banner"/>
  </a>
</p>
<!--END_SECTION:footer-->
