const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    flag_perm: {
        type: DataTypes.STRING,
        defaultValue: 'cliente' // 'admin' para o dono da padaria
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;