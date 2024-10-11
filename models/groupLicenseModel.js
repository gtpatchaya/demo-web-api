const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const groupLicense = sequelize.define('groupLicense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  licenseName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'groupLicense',
  timestamps: true,
  paranoid: true,
});

module.exports = groupLicense;
