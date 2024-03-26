const express = require("express");
const router = express.Router();
const path = require("path");
const adminRoutes = require("./admin");
const productControllers = require("../controllers/products");

router.get("/", productControllers.getShopProducts);

module.exports = router;
