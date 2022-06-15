'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date();
    const data = [
      { name: 'Собаки', createdAt: date, updatedAt: date },
      { name: 'Коты', createdAt: date, updatedAt: date },
      { name: 'Рыбки', createdAt: date, updatedAt: date },
      { name: 'Грызуны', createdAt: date, updatedAt: date },
      { name: 'Рептилии', createdAt: date, updatedAt: date },
      { name: 'Птицы', createdAt: date, updatedAt: date },
    ];
    await queryInterface.bulkInsert('categories', data, {});
  },
};
