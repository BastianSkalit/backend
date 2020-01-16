"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_product = sequelize.define(
    "tbl_product",
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER
    },
    {}
  );
  tbl_product.associate = function(models) {
    // associations can be defined here
    tbl_product.belongsTo(models.tbl_category, {
      foreignKey: "category_id",
      as: "category",
      sourceKey: "id"
    });
    tbl_product.belongsTo(models.tbl_user, {
      foreignKey: "createdBy",
      as: "user",
      sourceKey: "id"
    });
    tbl_product.hasMany(models.tbl_payment, {
      foreignKey: "product_id",
      as: "product"
    });
    tbl_product.belongsToMany(models.tbl_user, {
      through: models.tbl_favorites,
      as: "users",
      foreignKey: "product_id"
    });
  };
  return tbl_product;
};
