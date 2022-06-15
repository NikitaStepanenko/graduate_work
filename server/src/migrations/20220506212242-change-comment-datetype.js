'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('ratings', 'comment', {
      type: Sequelize.STRING(1234),
    });
  },
};
