"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tbl_products",
      [
        {
          name: "Iphone 11",
          image: "Image 1.jpg",
          category_id: "2",
          description:
            "Apple iPhone 11 Pro Max mengusung berbagai terobosan fitur baru yang merupakan inovasi andalan dari Apple. Desain iPhone 11 Pro Max yang hadir dengan layar Super Retina paling sempurna, yang dapat diidentifikasi melalui bodi berlapis kaca dengan posisi kamera yang memanjang vertikal di bagian sudut tepinya. Anda dapat menikmati kehandalan sistem kamera TrueDepth untuk meningkatkan fitur fotografi, mendukung penggunaan Face ID dan juga animoji. Pengisian daya baterai smartphone ini juga mengakomodasi teknologi nirkabel yang dapat berfungsi praktis di tempat umum seperti hotel, cafe, ataupun airport.",
          price: "23000000",
          createdBy: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name:
            "APPLE Macbook Pro Touch Bar 2018 MR972ID 15' Touch Bar/2.6GHz 6-core i7/16GB/512GB/Radeon Pro 560X 4GB - Silver",
          image: "image 2.jpg",
          category_id: "3",
          description:
            "APPLE Macbook Pro MR972ID merupakan perangkat notebook canggih dengan beragam spesifikasi mumpuni yang mampu memberikan Anda kemudahan saat bekerja. Notebook ini menggunakan prosesor Intel Core i7, ditambah dengan RAM 16 GB, serta kapasitas penyimpanan hingga 512 GB. Dengan spesifikasi tersebut, Anda dapat menggunakan notebook ini untuk mengerjakan berbagai pekerjaan dengan cepat dan mudah. Notebook ini juga telah menggunakan kartu grafis AMD Radeon Pro 560X untuk tampilan grafis yang lebih tajam dan memukau. Gunakan notebook canggih dari Apple ini sebagai perangkat notebook andalan Anda.",
          price: "40499000",
          createdBy: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tbl_products", null, {});
  }
};
