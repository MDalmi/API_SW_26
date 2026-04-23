const { Sequelize } = require('sequelize');
require('dotenv').config(); // Garante que o app leia o .env

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Isso é OBRIGATÓRIO para bancos em nuvem como o Neon
    }
  }
});

module.exports = sequelize;