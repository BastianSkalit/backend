"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_user = sequelize.define(
    "tbl_user",
    {
      username: DataTypes.STRING,
      fullname: DataTypes.STRING,
      image: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  tbl_user.associate = function(models) {
    // associations can be defined here
    tbl_user.hasMany(models.tbl_payment, {
      foreignKey: "buyer_id",
      as: "buyer"
    });
    tbl_user.hasMany(models.tbl_product, {
      foreignKey: "createdBy",
      as: "user"
    });
    tbl_user.belongsToMany(models.tbl_product, {
      through: models.tbl_favorites,
      as: "product",
      foreignKey: "user_id"
    });
  };
  return tbl_user;
};
