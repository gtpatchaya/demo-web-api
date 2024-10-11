'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('licenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      regPrefix: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      licenseNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groupLicenseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      provinceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      caseNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      warrantIssueDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      warrantExpiredDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      offenseDetails: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ownerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('licenses');
  }
};
