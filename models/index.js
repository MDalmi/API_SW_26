// models/index.js
const Pedido = require('./order');
const Produto = require('./product');
const Usuario = require('./user');

// Pedido → Produto (muitos para muitos via itens_pedido)
Pedido.belongsToMany(Produto, {
  through: 'itens_pedido',
  foreignKey: 'id_pedido',
  otherKey: 'id_produto',
  as: 'itens',
});

Produto.belongsToMany(Pedido, {
  through: 'itens_pedido',
  foreignKey: 'id_produto',
  otherKey: 'id_pedido',
  as: 'pedidos',
});

// Pedido → Usuario (muitos para um)
Pedido.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

Usuario.hasMany(Pedido, {
  foreignKey: 'id_usuario',
  as: 'pedidos',
});

module.exports = { Pedido, Produto, Usuario };