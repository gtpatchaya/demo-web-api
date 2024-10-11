'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('groupLicense', [
      { licenseName: 'กลุ่ม 1', createdAt: new Date(), updatedAt: new Date() },
      { licenseName: 'กลุ่ม 2', createdAt: new Date(), updatedAt: new Date() },
      { licenseName: 'กลุ่ม 3', createdAt: new Date(), updatedAt: new Date() },
      { licenseName: 'กลุ่ม 4', createdAt: new Date(), updatedAt: new Date() },
      { licenseName: 'กลุ่ม 5', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('groupLicense', null, {});
  }
};