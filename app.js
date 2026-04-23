const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const rotas = require('./routes/index');
const errorHandler = require('./middlewares/erroHandler');
const sequelize = require('./config/database');

// 1. Inicializa o app 
const app = express();
const PORT = 3000;

// 2. Middlewares 
app.use(express.json());

// 3. Rotas da API e Documentação
app.use('/api', rotas);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 4. Tratamento de Erros 
app.use(errorHandler);

sequelize.sync().then(() => {
    console.log('Tabelas sincronizadas no banco Neon com sucesso!');
    
    
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
        console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
}).catch(err => {
    console.error('Erro fatal ao sincronizar o banco de dados:', err);
});