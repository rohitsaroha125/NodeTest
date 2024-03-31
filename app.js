const path = require("path");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorControllers = require("./controllers/error");
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString()+"-"+(Math.random()*100000)+"-" + file.originalname);
  },
});
const uploads = multer({ storage: fileStorage });

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("fileUpload");
});

app.post("/file-upload", uploads.single("fileUpload"), (req, res, next) => {
  const username = req.body.username;
  const file = req.file;
  console.log("Username is ", username, file);
  res.redirect("/");
});

// app.use("/admin", adminRoutes.router);
// app.use(shopRoutes);

app.use(errorControllers.get404);

app.listen(5000, () => {
  console.log("Server Running");
});
