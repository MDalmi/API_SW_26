const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Tele Padaria',
      version: '1.0.0',
      description: 'Documentação da API para o trabalho de Serviços Web',
    },
    servers: [{ url: 'http://localhost:3000' }],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: { 
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: "Autenticação via JWT. Use 'Bearer <token>'. Obtenha o token em POST /api/auth/login"
        }
      },
      examples: {
        AdminToken: {
          value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (exemplo de token de admin)"
        },
        ProdutoExample: {
          value: { id: 1, nome: "Pão francês", descricao: "Pacote com 10 unidades", preco: 2.5, estoque: 100, criadoEm: "2024-03-15T10:30:00Z" }
        },
        PedidoExample: {
          value: { id: 1, clienteId: 42, status: "pendente", total: 199.9, criadoEm: "2024-03-15T10:30:00Z", itens: [{ produtoId: 7, quantidade: 2, precoUnitario: 99.95 }] }
        },
        LoginResponseExample: {
          value: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", tipo: "Bearer", expiresIn: "24h" }
        }
      }
    }
  },
  apis: ['./routes/*.js'], 
};

module.exports = swaggerJsDoc(swaggerOptions);