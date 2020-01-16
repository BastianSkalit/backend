const jwt = require("jsonwebtoken");

const models = require("../models");
const Users = models.tbl_user;

exports.login = (req, res) => {
  //check if email and pass match in db tbl user
  const name = req.body.name;
  const password = req.body.password; //use encryption in real world case!
  // cari expired token refresh token

  Users.findOne({ where: { username, password } }).then(user => {
    if (user) {
      const token = jwt.sign({ user }, "my-secret-key");
      res.send({
        user,
        token
      });
    } else {
      res.send({
        error: true,
        message: "Wrong Email or Password!"
      });
    }
  });
};

exports.register = (req, res) => {
  const { username, fullname, image, email, address, password } = req.body;

  Users.findAll({
    where: {
      name
    }
  }).then(user => {
    if (user.length > 0) {
      res.send({
        is_success: 0,
        status: 200,
        message: "username has been taken!",
        data: {}
      });
    } else {
      Users.findAll({
        where: {
          email
        }
      }).then(user => {
        if (user.length > 0) {
          res.send({
            is_success: 0,
            status: 200,
            message: "Email has been registered!",
            data: {}
          });
        } else {
          try {
            Users.create({
              name: name,
              email: email,
              phone: phone,
              password: password,
              address: address,
              image: image
            }).then(user => {
              const token = jwt.sign({ userId: user.id }, "Bastian");
              res.send({
                is_success: 1,
                status: 200,
                message: "Success",
                data: {
                  email,
                  token
                }
              });
            });
          } catch (error) {
            res.send({
              is_success: 0,
              status: 500,
              message: "Failed! : " + error,
              data: {}
            });
          }
        }
      });
    }
  });
};
