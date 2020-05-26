const express = require("express");
const bcrypt = require("bcryptjs");
const Volunteer = require("../models/volunteers");
const Ngo = require("../models/ngo");
const passport = require("passport");

exports.getVolunteerSignUp = (req, res) => {
  res.locals.title = "Volunteer Join | MyHelperNg";
  res.render("auth/volunteer-signup", { errors: null });
};

// POST /join/volunteer
exports.volunteerSignUp = (req, res) => {
  const {
    name,
    email,
    contact,
    gender,
    occupation,
    address,
    password,
    password2,
  } = req.body;

  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Not a valid email").isEmail();
  req.checkBody("contact", "Not a valid number").isNumeric();
  req.checkBody("gender", "Gender is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    res.locals.title = "Volunteer Join | MyHelperNg";
    res.render("auth/volunteer-signup", {
      errors: errors,
    });
  } else {
    Volunteer.findOne({ email: req.body.email }, function (err, user) {
      if (user) {
        let error = {
          param: "email",
          msg: "Email address already exist",
          value: req.body.email,
        };
        if (!errors) {
          errors = [];
        }
        errors.push(error);
        res.locals.title = "Volunteer Join | MyHelperNg";
        res.render("auth/volunteer-signup", {
          errors: errors,
        });
      } else {
        bcrypt
          .hash(password, 12)
          .then((password) => {
            const volunteer = new Volunteer({
              name,
              email,
              contact,
              gender,
              occupation,
              address,
              password,
            });
            return volunteer.save();
          })
          .then(() => {
            req.flash("success", "Registration successful");
            res.redirect("/login/volunteer");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  }
};

// GET /login/volunteer
exports.getVoluteerLogin = (req, res) => {
  res.locals.title = "Volunteer Login | MyHelperNg";
  res.render("login", { user: "volunteer", errors: null });
};

// POST /login/volunteer
exports.volunteerLogIn = (req, res, next) => {
  passport.authenticate("volunteer-local", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/login/volunteer",
    failureFlash: true,
  })(req, res, next);
  // const { email, password } = req.body;

  // req.checkBody("email", "Email is required").notEmpty();
  // req.checkBody("email", "Not a valid email").isEmail();
  // req.checkBody("password", "Password is required").notEmpty();

  // let errors = req.validationErrors();
  // if (errors) {
  //   res.locals.title = "Volunteer Login | MyHelperNg";
  //   res.render("login", {
  //     errors: errors,
  //     user: "volunteer",
  //   });
  // } else {
  //   Volunteer.findOne({ email }, function (err, user) {
  //     if (!user) {
  //       let error = {
  //         param: "email",
  //         msg: "Invalid email or password, try again",
  //         value: req.body.email,
  //       };
  //       if (!errors) {
  //         errors = [];
  //       }
  //       errors.push(error);
  //       res.locals.title = "Volunteer Login | MyHelperNg";
  //       return res.render("login", {
  //         errors: errors,
  //         user: "volunteer",
  //       });
  //     } else {
  //       bcrypt
  //         .compare(password, user.password)
  //         .then((valid) => {
  //           if (!valid) {
  //             let error = {
  //               param: "password",
  //               msg: "Invalid email or password, try again",
  //               value: req.body.password,
  //             };
  //             if (!errors) {
  //               errors = [];
  //             }
  //             errors.push(error);
  //             res.locals.title = "Volunteer Login | MyHelperNg";
  //             return res.render("login", {
  //               errors: errors,
  //               user: "volunteer",
  //             });
  //           } else {
  //             req.flash("success", "Login successful");

  //             // send to Volunteer dashboard
  //             res.render("volunteer-dashboard", {
  //               title: `Dashboard | ${user.name}`,
  //               name: user.name,
  //               email: user.email,
  //               contact: user.contact,
  //               gender: user.gender,
  //             });
  //           }
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     }
  //   });
  // }
};

//  for NGo

exports.getNgoSignUp = (req, res) => {
  res.locals.title = "NGO Join | MyHelperNg";
  res.render("auth/ngo-signup", { errors: null });
};

// POST /join/ngo
exports.ngoSignUp = (req, res) => {
  const { ngo_name, email, link, state, password, password2 } = req.body;

  req.checkBody("ngo_name", "Organisation name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Not a valid email").isEmail();
  // validate link
  req.checkBody("state", "State is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    res.locals.title = "NGO Join | MyHelperNg";
    res.render("auth/ngo-signup", {
      errors: errors,
    });
  } else {
    Ngo.findOne({ email: req.body.email }, function (err, user) {
      if (user) {
        let error = {
          param: "email",
          msg: "Email address already exist",
          value: req.body.email,
        };
        if (!errors) {
          errors = [];
        }
        errors.push(error);
        res.locals.title = "NGO Join | MyHelperNg";
        res.render("auth/ngo-signup", {
          errors: errors,
        });
      } else {
        bcrypt
          .hash(password, 12)
          .then((password) => {
            const ngo = new Ngo({
              ngo_name,
              email,
              link,
              state,
              password,
              password2,
            });
            return ngo.save();
          })
          .then(() => {
            req.flash("success", "Registration successful");
            res.redirect("/login/ngo");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  }
};

// GET /login/ngo
exports.getNgoLogin = (req, res) => {
  res.locals.title = "NGO Login | MyHelperNg";
  res.render("login", { user: "ngo", errors: null });
};

// POST /login/ngo
exports.ngoLogIn = async (req, res, next) => {
  passport.authenticate("ngo-local", {
    successRedirect: "/org/dashboard",
    failureRedirect: "/login/ngo",
    failureFlash: true,
  })(req, res, next);
  // const { email, password } = req.body;
  // req.checkBody("email", "Email is required").notEmpty();
  // req.checkBody("email", "Not a valid email").isEmail();
  // req.checkBody("password", "Password is required").notEmpty();
  // let errors = req.validationErrors();
  // if (errors) {
  //   res.locals.title = "NGO Login | MyHelperNg";
  //   res.render("login", {
  //     errors: errors,
  //     user: "ngo",
  //   });
  // } else {
  //   Ngo.findOne({ email }, function (err, user) {
  //     if (!user) {
  //       let error = {
  //         param: "email",
  //         msg: "Invalid email or password, try again",
  //         value: req.body.email,
  //       };
  //       if (!errors) {
  //         errors = [];
  //       }
  //       errors.push(error);
  //       res.locals.title = "NGO Login | MyHelperNg";
  //       return res.render("login", {
  //         errors: errors,
  //         user: "ngo",
  //       });
  //     } else {
  //       bcrypt
  //         .compare(password, user.password)
  //         .then((valid) => {
  //           if (!valid) {
  //             let error = {
  //               param: "password",
  //               msg: "Invalid email or password, try again",
  //               value: req.body.password,
  //             };
  //             if (!errors) {
  //               errors = [];
  //             }
  //             errors.push(error);
  //             res.locals.title = "NGO Login | MyHelperNg";
  //             return res.render("login", {
  //               errors: errors,
  //               user: "ngo",
  //             });
  //           } else {
  //             req.flash("success", "Login successful");
  //             // send to NGO dashboard
  //             res.render("ngo-dashboard", {
  //               title: `Dashboard | ${user.ngo_name}`,
  //               name: user.ngo_name,
  //             });
  //           }
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     }
  //   });
  // }
};
