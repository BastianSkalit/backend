"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tbl_payment",
      [
        {
          quantity: "1",
          totalPrice: "23000000",
          status: "",
          attachment: "",
          product_id: "1",
          buyer_id: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: "1",
          totalPrice: "40499000",
          status: "",
          attachment: "",
          product_id: "2",
          buyer_id: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tbl_payment", null, {});
  }
};
