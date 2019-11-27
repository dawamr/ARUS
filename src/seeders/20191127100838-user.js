"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Dawam",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Malicha",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Yuan",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hisnia",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ariaseta",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Musyafa",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hisnia",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Windy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Rio",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Salman",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Dimas",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
