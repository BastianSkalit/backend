"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category = sequelize.define(
    "tbl_category",
    {
      name: DataTypes.STRING
    },
    {}
  );
  tbl_category.associate = function(models) {
    // associations can be defined here
    tbl_category.hasMany(models.tbl_product, {
      as: "category",
      foreignKey: "category_id"
    });
  };
  return tbl_category;
};
