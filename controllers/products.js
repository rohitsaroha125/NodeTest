const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

const addProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

const getShopProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render("shop", {
    pageTitle: "Shop Page",
    products: products,
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};

module.exports = {
  getAddProduct,
  addProduct,
  getShopProducts,
};
