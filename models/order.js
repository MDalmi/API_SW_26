const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' } 
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    data_pedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    }
}, {
    tableName: 'pedidos',
    timestamps: false
});

module.exports = Pedido;