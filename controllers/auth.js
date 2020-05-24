const express = require("express");
const bcrypt = require("bcryptjs");
const Volunteer = require("../models/volunteers");
const Ngo = require("../models/ngo");

exports.getVolunteerSignUp = (req, res) => {
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
  res.render("login", { user: "volunteer" });
};

// POST /login/volunteer
exports.volunteerLogIn = async (req, res) => {
  res.render("index");
};

// NGo

exports.getNgoSignUp = (req, res) => {
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
  res.render("login", { user: "ngo" });
};

// POST /login/ngo
exports.ngoLogIn = async (req, res) => {
  res.render("index");
};
