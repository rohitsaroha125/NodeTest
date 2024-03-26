const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="username" /><button type="submit">Submit</button></form>'
  );
});

router.post("/product", (req, res, next) => {
  console.log(req.body.username);
  res.redirect("/");
});

module.exports = router;
