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
  res.locals.title = `Dashboard | ${req.user.name}`;
  res.render("volunteer-dashboard", {
    name: req.user.name,
    email: req.user.email,
    contact: req.user.contact,
    gender: req.user.gender,
  });
});

// volunteer login
router.route("/login/volunteer").get(getVoluteerLogin).post(volunteerLogIn);

// GET ngo signup
router.get("/join/ngo", getNgoSignUp);
// ngo signup
router.post("/join/ngo", ngoSignUp);
// ngo login
router.route("/login/ngo").get(getNgoLogin).post(ngoLogIn);
// GET ngo dashboard
router.get("/org/dashboard", (req, res) => {
  res.locals.title = `Dashboard | ${req.user.ngo_name}`;
  res.render("ngo-dashboard", {
    name: req.user.ngo_name,
  });
});

// logout

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Logout successful");
  res.redirect("/login");
});
module.exports = router;
