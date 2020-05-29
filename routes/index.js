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

// donate to ngo
router.get("/:id/give", (req, res) => {
  res.locals.title = "Give | MyHelperNg";
  Ngo.findOne({ ngo_name: req.params.id }).then((ngo) => {
    res.render("donate", {
      ngo: ngo,
    });
  });
});

// get all volunteer opportunities
router.get("/opportunities", (req, res) => {
  res.locals.title = "Opportunities | MyHelperNg";
  Ngo.find().then((ngos) => {
    res.render("opportunities", {
      ngos: ngos,
    });
  });
});

// search
router.post("/opportunities/search?", (req, res) => {
  res.locals.title = "Opportunities | MyHelperNg";
  const search_query = new RegExp(req.body.search, "i");
  Ngo.find({ ngo_name: search_query }).then((ngos) => {
    if (ngos.length > 0) {
      // check if user is_authenticated else set user variable in nav bar to null
      if (req.user) {
        res.render("volunteer-dashboard", {
          ngos: ngos,
          user: req.user,
          errors: null,
        });
      } else {
        res.render("opportunities", {
          ngos: ngos,
          user: null,
        });
      }
    } else {
      Ngo.find().then((ngos) => {
        if (req.user) {
          req.flash("success", "No results found. Try a better search");
          res.redirect("/user/dashboard");
        } else {
          req.flash("success", "No results found. Try a better search");
          res.render("opportunities", {
            ngos: ngos,
            user: null,
          });
        }
      });
    }
  });
});
module.exports = router;
