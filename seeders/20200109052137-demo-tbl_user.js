"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tbl_users",
      [
        {
          username: "si unyil",
          fullname: "Unyil",
          image: "Image1.jpg",
          email: "siunyil@gmail.com",
          phone: "+62 81234567890",
          address: "bintaro",
          password: "abc123",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "si bolang",
          fullname: "Bocah Petualang",
          image: "Image2.jpg",
          email: "sibolang@gmail.com",
          phone: "+62 81324567890",
          address: "bintaro",
          password: "abc123",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("tbl_users", null, {});
  }
};
