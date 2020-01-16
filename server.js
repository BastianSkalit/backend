require("express-group-routes");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const usersControllers = require("./Controllers/Tbl_user");
const categoriesControllers = require("./Controllers/Tbl_category");
const productControllers = require("./Controllers/Tbl_product");
const paymentsControllers = require("./Controllers/Tbl_payments");
const favoritesControllers = require("./Controllers/Tbl_favorites");

const { authenticated } = require("./middleware");

app.group("/api/v1", router => {
  // API AUTH USER

  router.post("/register", usersControllers.register);
  router.post("/login", usersControllers.login);

  // API PROFILE
  router.get("/profile/:id", usersControllers.profile);
  router.get("/user", authenticated, usersControllers.user);
  router.patch("/profile", authenticated, usersControllers.update);
  router.get("/user/favorites", authenticated, favoritesControllers.favorites);
  router.get("/user/favorite", authenticated, favoritesControllers.favorite);
  router.post("/favorite", authenticated, favoritesControllers.addFavorite);
  router.delete(
    "/favorite",
    authenticated,
    favoritesControllers.deleteFavorite
  );

  // API CATEGORIES

  router.get("/categories", categoriesControllers.index); // get all categories
  router.get("/category/:id/product", categoriesControllers.category); // get all product by category
  router.post("/category", categoriesControllers.post); // add category
  router.patch("/category/:id", categoriesControllers.patch); // update category
  router.delete("/category/:id", categoriesControllers.delete); // delete category

  // API Product
  router.get("/product-all", productControllers.all);
  router.get("/product", productControllers.index);
  router.get("/product?name=", productControllers.index); // get product by keywords
  router.get("/product/:id", productControllers.detail); // get product by id
  router.post("/product", authenticated, productControllers.post); // post product
  router.patch("/product/:id", authenticated, productControllers.patch); // update product
  router.delete("/product/:id", authenticated, productControllers.delete); // delete product

  // API Payment
  router.post("/product/order", authenticated, paymentsControllers.post); // add payment
  router.patch("/order/:id", authenticated, paymentsControllers.confirm); // conrifm
  router.get("/payment", authenticated, paymentsControllers.pending);
  router.get("/order", authenticated, paymentsControllers.approved);
  router.get("/order?status=", authenticated, paymentsControllers.approved);
});

app.listen(port, console.log(`Listen to port ${port}`));
