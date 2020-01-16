"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tbl_categories",
      [
        {
          name: "Fashion",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Phone, Tablet & Gadget",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Computers, Office & Peripherals",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Otomotif",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sport & Lifestyle",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Camera & Audio",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Home Supplies",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tbl_categories", null, {});
  }
};
