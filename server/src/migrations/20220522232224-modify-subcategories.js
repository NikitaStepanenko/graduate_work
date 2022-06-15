'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('subcategories', 'name', {
      unique: false,
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
