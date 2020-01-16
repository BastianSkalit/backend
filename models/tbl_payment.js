"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_payment = sequelize.define(
    "tbl_payment",
    {
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.STRING,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER
    },
    {}
  );
  tbl_payment.associate = function(models) {
    // associations can be defined here
    tbl_payment.belongsTo(models.tbl_user, {
      foreignKey: "buyer_id",
      as: "buyer",
      sourceKey: "id"
    });
    tbl_payment.belongsTo(models.tbl_product, {
      foreignKey: "product_id",
      as: "event",
      sourceKey: "id"
    });
  };
  return tbl_payment;
};
