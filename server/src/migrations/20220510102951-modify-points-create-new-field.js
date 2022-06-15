'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('point', 'status', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
  },
};
