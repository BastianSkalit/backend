const models = require("../models");
const categories = models.tbl_category;
const products = models.tbl_product;
const users = models.tbl_user;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Products, formatRupiah } = require("../helpers/functions");

exports.index = (req, res) => {
  products
    .findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${req.query.name}%`
            }
          }
        ]
      },
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
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(Products(data));
      } else {
        res.status(200).json({
          success: false,
          message: "product not founds"
        });
      }
    });
};

// local = local.replace("/", "-");

exports.all = (req, res) => {
  products
    .findAll({
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
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(Products(data));
      } else {
        res.status(200).json({
          message: "product not founds"
        });
      }
    });
};

exports.detail = (req, res) => {
  products
    .findOne({
      where: {
        id: req.params.id
      },
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
    })
    .then(data => {
      if (data === null) {
        res.status(200).json({
          message: "product not found",
          success: false
        });
      } else {
        res.status(200).json({
          id: data.id,
          name: data.title,
          image: data.image,
          category_name: data.category.name,
          category: {
            id: data.category.id,
            name: data.category.name
          },
          description: data.description,
          price: formatRupiah(data.price),
          priceNumber: data.price,
          createdBy: {
            id: data.user.id,
            fullname: data.user.fullname,
            image: data.user.image,
            email: data.user.email,
            phone: data.user.phone
          }
        });
      }
    });
};

exports.post = (req, res) => {
  let storeName;
  const { name, image, category_id, description, price } = req.body;
  storeName = name.trim();
  products
    .findAll({
      where: {
        name: storeName
      }
    })
    .then(productsData => {
      if (productsData.length > 0) {
        res.status(200).json({
          message: "name has been used",
          status: "failed"
        });
      } else {
        products
          .create({
            name: storeName,
            image: image,
            category_id: category_id,
            description: description,
            price: price,
            createdBy: req.user_id
          })
          .then(data => {
            categories
              .findOne({
                where: {
                  id: data.category_id
                }
              })
              .then(category => {
                users
                  .findOne({
                    where: {
                      id: data.createdBy
                    }
                  })
                  .then(user => {
                    res.status(200).json({
                      status: "success",
                      id: data.id,
                      name: data.name,
                      category: {
                        id: category.id,
                        name: category.name
                      },

                      price: formatRupiah(data.price),
                      description: data.description,
                      image: data.image,
                      createdBy: {
                        id: data.user.id,
                        fullname: data.user.fullname,
                        image: data.user.image,
                        email: data.user.email,
                        phone: data.user.phone
                      }
                    });
                  });
              });
          });
      }
    });
};

exports.patch = (req, res) => {
  products
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(product => {
      if (product != null) {
        if (product.createdBy != req.user_id) {
          res.status(403).json({
            message: "you are not authorized to update this product"
          });
        } else {
          products
            .update(req.body, {
              where: {
                id: req.params.id
              }
            })
            .then(data => {
              if (data === 0) {
                res.status(500).json({
                  message: "failed to update this product"
                });
              } else {
                res.status(200).json({
                  message: "success update this product"
                });
              }
            });
        }
      } else {
        res.status(200).json({
          message: "product is not found"
        });
      }
    });
};

exports.delete = (req, res) => {
  products
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(product => {
      if (product === null) {
        res.status(200).json({
          message: "product is not found"
        });
      } else {
        if (product.createdBy != req.user_id) {
          res.status(403).json({
            message: "you are not authorized to delete this product"
          });
        } else {
          products
            .destroy({
              where: {
                id: req.params.id
              }
            })
            .then(data => {
              if (data === 0) {
                res.status(500).json({
                  success: false,
                  message: "Failed to delete this product"
                });
              } else {
                res.status(200).json({
                  success: true,
                  message: "success delete this product"
                });
              }
            });
        }
      }
    });
};
