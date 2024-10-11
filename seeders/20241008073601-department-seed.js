'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('department', [
      { name: 'Department 1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Department 2', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Department 3', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Department 4', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Department 5', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Department 6', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Department 7', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Department 8', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Department 9', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Department 10', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('department', null, {});
  }
};
