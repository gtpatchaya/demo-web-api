const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const department = sequelize.define('department', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'department',
  timestamps: true,
  paranoid: true,
});

module.exports = department;
