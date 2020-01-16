const models = require("../models");
const categories = models.tbl_category;
const products = models.tbl_product;
const users = models.tbl_user;
const favorites = models.tbl_favorites;
const { newFavorites } = require("../helpers/functions");

exports.favorites = (req, res) => {
  favorites
    .findAll({
      where: {
        user_id: req.user_id
      },
      include: [
        {
          model: products,
          as: "product",
          include: [
            {
              model: categories,
              as: "category"
            },
            {
              model: users,
              as: "user"
            }
          ]
        },
        {
          model: users,
          as: "user"
        }
      ]
    })
    .then(result => {
      res.status(200).json(newFavorites(result));
    });
};

exports.favorite = (req, res) => {
  favorites
    .findAll({
      where: {
        user_id: req.user_id
      }
    })
    .then(data => {
      res.status(200).json(data);
    });
};

exports.addFavorite = (req, res) => {
  favorites
    .findAll({
      where: {
        user_id: req.user_id,
        product_id: req.body.product_id
      }
    })
    .then(favorite => {
      if (favorite.length > 0) {
        res.status(200).json({
          status: false,
          message: `Favorite already exists`
        });
      } else {
        favorites
          .create({
            user_id: req.user_id,
            product_id: req.body.product_id
          })
          .then(result => {
            if (result != null) {
              res.status(200).json({
                status: true,
                message: `Product was favorite's`
              });
            } else {
              res.status(200).json({
                status: false,
                message: `Failed To favorite this product`
              });
            }
          });
      }
    });
};

exports.deleteFavorite = (req, res) => {
  favorites
    .destroy({
      where: {
        user_id: req.user_id,
        product_id: req.body.product_id
      }
    })
    .then(result => {
      if (result === 0) {
        res.status(500).json({
          status: false,
          message: "unFavorite has been failed"
        });
      } else {
        res.status(200).json({
          status: true,
          message: "unFavorite has been success"
        });
      }
    });
};
