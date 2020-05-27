const express = require("express");
const router = express.Router();
const Ngo = require("../models/ngo");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.locals.title = "Home | MyHelperNg";
  res.render("index");
});

/* GET about page. */
router.get("/about", (req, res, next) => {
  res.locals.title = "About | MyHelperNg";
  res.render("about");
});

// GET opportunities

// GET ngo progile
router.get("/orgs/:id", (req, res) => {
  Ngo.findOne({ ngo_name: req.params.id }).then((ngo) => {
    res.render("ngo-profile", {
      ngo: ngo,
    });
  });
});

module.exports = router;
