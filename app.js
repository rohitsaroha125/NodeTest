const express = require("express");

const app = express();

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="username" /><button type="submit">Submit</button></form>'
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body.username);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello From Express</h1>");
});

app.use((req, res, next) => {
  console.log("Middleware running");
});

app.listen(5000, () => {
  console.log("Server Running");
});
