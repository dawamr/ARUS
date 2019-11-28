"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("families", "age", {
      type: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("families", "age");
  }
};
