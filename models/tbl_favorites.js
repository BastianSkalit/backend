"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_favorites = sequelize.define(
    "tbl_favorites",
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER
    },
    {}
  );
  tbl_favorites.associate = function(models) {
    // associations can be defined here
    tbl_favorites.belongsTo(models.tbl_user, {
      foreignKey: "user_id",
      sourceKey: "id",
      as: "user"
    });
    tbl_favorites.belongsTo(models.tbl_product, {
      foreignKey: "product_id",
      sourceKey: "id",
      as: "product"
    });
  };
  return tbl_favorites;
};
