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
    components: {
      securitySchemes: {
        bearerAuth: { // Configuração exigida para a Etapa 4 [cite: 628, 629]
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Caminho onde o Swagger buscará as anotações
};

module.exports = swaggerJsDoc(swaggerOptions);