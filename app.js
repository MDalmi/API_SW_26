const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const rotas = require('./routes/index');
const errorHandler = require('./middlewares/erroHandler');
const sequelize = require('./config/database'); // Importa a conexão com o Neon

// 1. Inicializa o app PRIMEIRO
const app = express();
const PORT = 3000;

// 2. Middlewares (A ordem importa: JSON sempre antes das rotas)
app.use(express.json());

// 3. Rotas da API e Documentação
app.use('/api', rotas);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 4. Tratamento de Erros (Sempre por último nas configurações do express)
app.use(errorHandler);

// 5. Sincroniza o banco e DEPOIS liga o servidor
sequelize.sync().then(() => {
    console.log('Tabelas sincronizadas no banco Neon com sucesso!');
    
    // O app.listen fica APENAS AQUI DENTRO
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
        console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
}).catch(err => {
    console.error('Erro fatal ao sincronizar o banco de dados:', err);
});