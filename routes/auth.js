const router = require("express").Router();
const {
  volunteerSignUp,
  volunteerLogIn,
  getVoluteerLogin,
  getVolunteerSignUp,
  getNgoSignUp,
  ngoSignUp,
  getNgoLogin,
  ngoLogIn,
  updateVolunteerProfile,
  updateNgoProfile,
} = require("../controllers/auth");
const Ngo = require("../models/ngo");

// GET intro page
router.get("/join", (req, res) => {
  res.locals.title = "Join | MyHelperNg";
  res.render("signup", { errors: null });
});

// GET users choice login page
router.get("/login", (req, res) => {
  res.locals.title = "Login | MyHelperNg";
  res.render("login-users");
});

// GET volunteer signup
router.get("/join/volunteer", getVolunteerSignUp);
// volunteer signup
router.post("/join/volunteer", volunteerSignUp);
// GET volunteer dashboard
router.get("/user/dashboard", (req, res) => {
  if (typeof req.user !== "undefined") {
    res.locals.title = `Dashboard | ${req.user.name}`;
    Ngo.find().then((ngos) => {
      res.render("volunteer-dashboard", {
        ngos: ngos,
        errors: null,
      });
    });
  } else {
    res.redirect("/login");
  }
});

// volunteer login
router.route("/login/volunteer").get(getVoluteerLogin).post(volunteerLogIn);

// update volunteer dashboard
router.post("/user/dashboard", updateVolunteerProfile);

// GET ngo signup
router.get("/join/ngo", getNgoSignUp);
// ngo signup
router.post("/join/ngo", ngoSignUp);
// ngo login
router.route("/login/ngo").get(getNgoLogin).post(ngoLogIn);
// GET ngo dashboard
router.get("/org/dashboard", (req, res) => {
  if (typeof req.user !== "undefined") {
    res.locals.title = `Dashboard | ${req.user.ngo_name}`;
    Ngo.findOne({ ngo_name: req.user.ngo_name }).then((ngo) => {
      res.render("ngo-dashboard", {
        errors: null,
        volunteers: ngo.volunteers,
      });
    });
  } else {
    res.redirect("/login");
  }
});

// ngo volunteer applicants
router.get("/:id/:volunteer", (req, res) => {
  if (req.user) {
    Ngo.findOne({ ngo_name: req.params.id })
      .then((ngo) => {
        const get_volunteer = ngo.volunteers.filter((user) => {
          return user.name === req.params.volunteer;
        });
        res.render("ngo-applicants", {
          volunteer: get_volunteer[0],
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/login/volunteer");
  }
});

// update ngo dashboard
router.post("/org/dashboard", updateNgoProfile);

// logout

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Logout successful");
  res.redirect("/login");
});
module.exports = router;
