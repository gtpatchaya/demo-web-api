const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const License = require('../models/licenseModel')

const Attachment = sequelize.define('Attachment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    licenseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'licenses',
            key: 'id',
        },
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deletedAt: DataTypes.DATE,
}, {
    tableName: 'attachment',
    timestamps: true,
    paranoid: true,
});

Attachment.associate = () => {
    const License = require('./licenseModel');
    Attachment.belongsTo(License, { foreignKey: 'licenseId', as: 'license' });
};

module.exports = Attachment;
