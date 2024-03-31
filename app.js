const path = require("path");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorControllers = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("fileUpload");
});

// app.use("/admin", adminRoutes.router);
// app.use(shopRoutes);

app.use(errorControllers.get404);

app.listen(5000, () => {
  console.log("Server Running");
});
