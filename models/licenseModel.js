const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const groupLicense = require('./groupLicenseModel');
const department = require('./departmentModel');
const attachment = require('./attachmentModel');

const License = sequelize.define('License', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  regPrefix: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupLicenseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  provinceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  caseNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  warrantIssueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  warrantExpiredDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  offenseDetails: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  contractNumber: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'licenses',
  timestamps: true,
  paranoid: true,
});

License.belongsTo(groupLicense, { foreignKey: 'groupLicenseId', as: 'groupLicense' });
License.belongsTo(department, { foreignKey: 'departmentId', as: 'department' });

License.hasMany(attachment, {
  foreignKey: 'licenseId',
  as: 'attachments',
});


module.exports = License;
