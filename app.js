const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const rotas = require('./routes/index');
const errorHandler = require('./middlewares/erroHandler');
const sequelize = require('./config/database');
const bcrypt = require('bcrypt');
const { Usuario, Produto, Pedido } = require('./models/index');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', rotas);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(errorHandler);

async function seedDatabase() {
  const totalUsuarios = await Usuario.count();
  if (totalUsuarios > 0) {
    console.log('Banco já criado');
    return;
  }

  // Usuários
  const senhaAdmin  = await bcrypt.hash('admin123', 10);
  const senhaCliente = await bcrypt.hash('cliente123', 10);

  const [admin, joao, maria, carlos] = await Usuario.bulkCreate([
    { nome: 'Admin Padaria',  email: 'admin@padaria.com',  senha: senhaAdmin,   flag_perm: 'admin'   },
    { nome: 'João Silva',     email: 'joao@email.com',     senha: senhaCliente, flag_perm: 'cliente' },
    { nome: 'Maria Oliveira', email: 'maria@email.com',    senha: senhaCliente, flag_perm: 'cliente' },
    { nome: 'Carlos Santos',  email: 'carlos@email.com',   senha: senhaCliente, flag_perm: 'cliente' },
  ]);

  // Produtos
  await Produto.bulkCreate([
    { nome: 'Pão Francês',     preco: 0.75,  descricao: 'Pão crocante por unidade',               estoque: 200 },
    { nome: 'Pão de Queijo',   preco: 2.50,  descricao: 'Pão de queijo mineiro, unidade 50g',     estoque: 150 },
    { nome: 'Croissant',       preco: 5.90,  descricao: 'Croissant folhado com manteiga',          estoque: 80  },
    { nome: 'Bolo de Cenoura', preco: 18.00, descricao: 'Fatia com cobertura de chocolate',        estoque: 30  },
    { nome: 'Coxinha',         preco: 4.50,  descricao: 'Coxinha de frango com catupiry',          estoque: 100 },
    { nome: 'Café Expresso',   preco: 6.00,  descricao: 'Café expresso dose dupla',                estoque: 999 },
    { nome: 'Suco de Laranja', preco: 8.00,  descricao: 'Suco natural 300ml',                      estoque: 60  },
    { nome: 'Baguete',         preco: 9.90,  descricao: 'Baguete tradicional francesa 250g',       estoque: 50  },
  ]);

  // Pedidos
  await Pedido.bulkCreate([
    { id_usuario: joao.id,   status: 'entregue',  total: 12.65, data_pedido: '2025-03-10 08:15:00' },
    { id_usuario: joao.id,   status: 'entregue',  total: 18.00, data_pedido: '2025-03-12 09:00:00' },
    { id_usuario: maria.id,  status: 'entregue',  total: 22.40, data_pedido: '2025-03-11 10:30:00' },
    { id_usuario: maria.id,  status: 'cancelado', total: 9.90,  data_pedido: '2025-03-15 08:45:00' },
    { id_usuario: carlos.id, status: 'pendente',  total: 15.50, data_pedido: '2025-03-18 08:20:00' },
  ]);

}

// =============================================
// Inicialização
// =============================================
sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Tabelas sincronizadas com sucesso!');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('Erro fatal ao sincronizar o banco de dados:', err);
  });