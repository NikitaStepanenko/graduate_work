'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_info', 'description', {
      type: Sequelize.STRING,
    });
  },
};
