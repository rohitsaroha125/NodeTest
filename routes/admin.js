const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
const productControllers = require("../controllers/products");

const router = express.Router();

const products = [];

router.get("/add-product", productControllers.getAddProduct);
router.post("/add-product", productControllers.addProduct);

module.exports = {
  router,
  products,
};
