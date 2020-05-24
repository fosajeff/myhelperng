const router = require("express").Router();
const {
  volunteerSignUp,
  volunteerLogIn,
  getVoluteerLogin,
  getVolunteerSignUp,
} = require("../controllers/auth");

// GET intro page
router.get("/join", (req, res) => {
  res.render("signup", { errors: null });
});

// GET users login page
router.get("/login", (req, res) => {
  res.render("login-users");
});

// GET volunteer signup
router.get("/join/volunteer", getVolunteerSignUp);
// volunteer signup
router.post("/join/volunteer", volunteerSignUp);

// volunteer login
router.route("/login/volunteer").get(getVoluteerLogin).post(volunteerLogIn);

module.exports = router;
