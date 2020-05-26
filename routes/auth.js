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
} = require("../controllers/auth");

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
    res.render("volunteer-dashboard");
  } else {
    res.redirect("/login");
  }
});

// volunteer login
router.route("/login/volunteer").get(getVoluteerLogin).post(volunteerLogIn);

// update volunteer dashboard
router.post("/user/dashboard/update", updateVolunteerProfile);

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
    res.render("ngo-dashboard", {
      name: req.user.ngo_name,
    });
  } else {
    res.redirect("/login");
  }
});

// logout

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Logout successful");
  res.redirect("/login");
});
module.exports = router;
