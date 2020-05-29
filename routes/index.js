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
          req.flash("info", "No results found. Try a better search");
          res.render("opportunities", {
            ngos: ngos,
            user: null,
          });
        }
      });
    }
  });
});

// apply to ngo - Terms and Condition
router.get("/:id/terms", (req, res) => {
  if (req.user) {
    Ngo.findOne({ ngo_name: req.params.id }).then((ngo) => {
      // check if is_authenticated
      res.render("ngo-tc", {
        ngo: ngo,
      });
    });
  } else {
    res.redirect("/login/volunteer");
  }
});

// apply to ngo - Application form
router.get("/:id/apply", (req, res) => {
  if (req.user) {
    res.render("ngo-apply-form", {
      ngo: req.params.id,
      errors: null,
    });
  } else {
    res.redirect("/login/volunteer");
  }
});

// application process
router.post("/:id/apply", (req, res) => {
  // check if is_volunteer
  if (req.user.name) {
    const volunteer = {
      name: req.user.name,
      state: req.user.state,
      email: req.user.email,
      gender: req.body.gender,
      start_date: req.body.start_date,
      stay_number: req.body.stay_number,
      stay_duration: req.body.stay_duration,
      no_volunteers: req.body.no_volunteers,
      phone_number: req.body.phone_number,
      other: req.body.other,
      occupation: req.body.occupation,
      age: req.body.age,
    };
    req.checkBody("phone_number", "Phone number not valid").isNumeric();

    let errors = req.validationErrors();
    if (errors) {
      res.render("ngo-apply-form", {
        errors: errors,
        user: req.user,
        ngo: req.params.id,
      });
    } else {
      Ngo.findOne({ ngo_name: req.params.id }).then((ngo) => {
        const exist = ngo.volunteers.some((user) => {
          return user.name === volunteer.name;
        });

        if (exist) {
          res.render("apply-response", {
            ngo: ngo,
            user: req.user,
            msg: "You already submitted your application",
          });
        } else {
          ngo.volunteers.push(volunteer);
          ngo.save();
          res.render("apply-response", {
            ngo: ngo,
            user: req.user,
            msg:
              "Thank you for applying. We are glad you are joining us. Our representative will reach out to you soon.",
          });
        }
      });
    }
  } else {
    res.redirect("/login/volunteer");
  }
});
module.exports = router;
