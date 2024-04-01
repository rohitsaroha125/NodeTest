const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const PdfKit = require("pdfkit");
const stripe = require("stripe")(
  "sk_test_51P0cwGSIXzn3Xs1iYZr018LCnS8LYPmExjeEAdEcecgLebnyFyobgRqjcJX2vNVhXbUKe3yXSuZVimfYYpkUs94D00l4thfgpz"
);

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

  const pdfDoc = new PdfKit();
  res.setHeader("content-type", "application/pdf");
  res.setHeader("content-disposition", "attachment; filename=blank.pdf");
  pdfDoc.pipe(fs.createWriteStream(invoicePath));
  pdfDoc.pipe(res);

  pdfDoc.text("Hello World");
  pdfDoc.end();
});

router.get("/checkout", (req, res, next) => {
  res.render("checkout");
});

router.get("/success", (req, res, next) => {
  res.render("success");
});

router.get("/cancel", (req, res, next) => {
  res.render("cancel");
});

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1P0dJHSIXzn3Xs1inxhISLks",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5000/success`,
    cancel_url: `http://localhost:5000/cancel`,
  });

  res.redirect(303, session.url);
});

module.exports = router;
