const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfkit = require("pdfkit");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString() +
        "-" +
        Math.random() * 100000 +
        "-" +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploads = multer({ storage: fileStorage, fileFilter });

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("fileUpload");
});

router.post("/file-upload", uploads.single("fileUpload"), (req, res, next) => {
  const username = req.body.username;
  const file = req.file;
  console.log("Username is ", username, file);
  res.redirect("/");
});

router.get("/invoice", (req, res, next) => {
  res.render("invoiceFile");
});

router.get("/order/:orderId", (req, res, next) => {
  const invoicePath = path.join(__dirname, "..", "uploads", "pdf", "blank.pdf");

  //   fs.readFile(invoicePath, (err, data) => {
  //     res.setHeader("content-type", "application/pdf");
  //     res.setHeader("content-disposition", "attachment; filename=blank.pdf");
  //     res.send(data);
  //   });

  const file = fs.createReadStream(invoicePath);
  res.setHeader("content-type", "application/pdf");
  res.setHeader("content-disposition", "attachment; filename=blank.pdf");
  file.pipe(res);
});

module.exports = router;
