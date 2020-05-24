const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET about page. */
router.get("/about", (req, res, next) => {
  res.render("about");
});

module.exports = router;
