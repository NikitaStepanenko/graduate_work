'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date();
    const data = [
      { value: 'USER', createdAt: date, updatedAt: date },
      { value: 'ADMIN', createdAt: date, updatedAt: date },
    ];
    await queryInterface.bulkInsert('roles', data, {});
  },
};
