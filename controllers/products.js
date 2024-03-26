const products = [];

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
  products.push({ title: req.body.title });
  res.redirect("/");
};

const getShopProducts = (req, res, next) => {
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
  products,
  getAddProduct,
  addProduct,
  getShopProducts,
};
