const express = require("express");
const bcrypt = require("bcryptjs");
const Volunteer = require("../models/volunteers");

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
    try {
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
          volunteer.save();
        })
        .then(() => {
          req.flash("success", "Registration successful");
          res.redirect("/login/volunteer");
        });
    } catch (err) {
      console.error(err);
    }
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
