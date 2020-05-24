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
  res.render("signup", { errors: null });
});

// GET users choice login page
router.get("/login", (req, res) => {
  res.render("login-users");
});

// GET volunteer signup
router.get("/join/volunteer", getVolunteerSignUp);
// volunteer signup
router.post("/join/volunteer", volunteerSignUp);

// volunteer login
router.route("/login/volunteer").get(getVoluteerLogin).post(volunteerLogIn);

// GET ngo signup
router.get("/join/ngo", getNgoSignUp);
// ngo signup
router.post("/join/ngo", ngoSignUp);

// ngo login
router.route("/login/ngo").get(getNgoLogin).post(ngoLogIn);

module.exports = router;
