const models = require("../models");
const categories = models.tbl_category;
const products = models.tbl_product;
const users = models.tbl_user;
const payments = models.tbl_payment;
const { newPayments, formatRupiah } = require("../helpers/functions");

exports.post = (req, res) => {
  console.log(req.body.product_id);
  products
    .findOne({
      where: {
        id: req.body.product_id
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
    .then(product => {
      if (product === null) {
        res.status(200).json({
          success: false,
          message: "product not found"
        });
      } else {
        const { quantity, product_id } = req.body;
        console.log(product_id);
        payments
          .create({
            quantity: quantity,
            totalPrice: quantity * product.price,
            status: "pending",
            attachment:
              "http://khanfarkhan.com/wp-content/uploads/2018/03/terbaru13-Contoh-Bentuk-Kwitansi-Pembayaran-2.png",
            product_id: product_id,
            buyer_id: req.user_id
          })
          .then(data => {
            if (data === 0) {
              res.status(500).json({
                message: "add payment failed",
                success: false
              });
            } else {
              res.status(200).json({
                success: true,
                id: data.id,
                product: {
                  id: product.id,
                  name: product.name,
                  image: product.image,
                  category: {
                    id: product.category.id,
                    name: product.category.name
                  },
                  description: product.description,
                  price: formatRupiah(product.price),
                  createdBy: {
                    id: product.user.id,
                    fullname: product.user.fullname,
                    image: product.user.image,
                    email: product.user.email,
                    phone: product.user.phone
                  }
                },
                quantity: data.quantity,
                totalPrice: data.totalPrice,
                attachment: data.attachment,
                status: data.status
              });
            }
          });
      }
    });
};

exports.confirm = (req, res) => {
  payments
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(payment => {
      if (payment === null) {
        res.status(200).json({
          message: "payment not found"
        });
      } else {
        if (payment.buyer_id != req.user_id) {
          res.status(403).json({
            message: "you not autorized in this order"
          });
        } else {
          payments
            .update(
              {
                status: req.body.status
              },
              {
                where: {
                  id: req.params.id
                }
              }
            )
            .then(data => {
              if (data === 0) {
                res.status(500).json({
                  message: "update error",
                  status: "failed"
                });
              } else {
                products
                  .findOne({
                    where: {
                      id: payment.product_id
                    },
                    include: [
                      {
                        model: users,
                        as: "user"
                      },
                      {
                        model: categories,
                        as: "category"
                      }
                    ]
                  })
                  .then(product => {
                    res.status(200).json({
                      status: "success",
                      id: payment.id,
                      product: {
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        category: {
                          id: product.category.id,
                          name: product.category.name
                        },
                        description: product.description,
                        price: formatRupiah(product.price),
                        createdBy: {
                          id: product.user.id,
                          fullname: product.user.fullname,
                          image: product.user.image,
                          email: product.user.email,
                          phone: product.user.phone
                        }
                      },
                      quantity: payment.quantity,
                      totalPrice: formatRupiah(payment.totalPrice),
                      attachment: payment.attachment,
                      status: req.body.status
                    });
                  });
              }
            });
        }
      }
    });
};

exports.approved = (req, res) => {
  payments
    .findAll({
      where: {
        status: req.query.status,
        buyer_id: req.user_id
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
          as: "buyer"
        }
      ]
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(newPayments(data));
      } else {
        res.status(200).json({
          message: "Your product is not found",
          result: false
        });
      }
    });
};

exports.pending = (req, res) => {
  payments
    .findAll({
      where: {
        buyer_id: req.user_id,
        status: "pending"
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
          as: "buyer"
        }
      ]
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(newPayments(data));
      } else {
        res.status(200).json({
          message: "data payment is not found",
          result: false
        });
      }
    });
};
