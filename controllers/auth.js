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
  const { name, email, contact, state, password, password2 } = req.body;

  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Not a valid email").isEmail();
  req.checkBody("contact", "Not a valid number").isNumeric();
  req.checkBody("state", "State is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password", "Password too short").isLength({ min: 5 });

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
              state,
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
    badRequestMessage: "Please enter valid credentials",
    failureRedirect: "/login/volunteer",
    failureFlash: true,
  })(req, res, next);
};

// POST update profile info
exports.updateVolunteerProfile = (req, res) => {
  let updatedBody = req.body;
  updatedBody.name ? (name = updatedBody.name) : (name = req.user.name);
  updatedBody.state ? (state = updatedBody.state) : (state = req.user.state);
  updatedBody.address
    ? (address = updatedBody.address)
    : (address = req.user.address);
  updatedBody.contact
    ? (contact = updatedBody.contact)
    : (contact = req.user.contact);
  updatedBody.gender
    ? (gender = updatedBody.gender)
    : (gender = req.user.gender);
  updatedBody.dob ? (dob = updatedBody.dob) : (dob = req.user.dob);
  updatedBody.about ? (about = updatedBody.about) : (about = req.user.about);
  updatedBody.experience
    ? (experience = updatedBody.experience)
    : (experience = req.user.experience);
  updatedBody.url ? (url = updatedBody.url) : (url = req.user.url);

  req.checkBody("url", "Not a valid link").isURL();
  req.checkBody("contact", "Not a valid number").isNumeric();
  let errors = req.validationErrors();
  if (errors) {
    res.locals.title = `Dashboard | ${req.user.name}`;
    res.locals.user = req.user;
    res.render("volunteer-dashboard", {
      errors: errors,
    });
  } else {
    Volunteer.updateOne(
      { email: req.user.email },
      {
        $set: {
          name,
          state,
          address,
          contact,
          gender,
          dob,
          about,
          experience,
          url,
        },
      }
    )
      .then(() => {
        req.flash("success", "Update successful");
        res.redirect("/user/dashboard");
      })
      .catch((err) => console.error(err));
  }
};

//  for NGo

exports.getNgoSignUp = (req, res) => {
  res.locals.title = "NGO Join | MyHelperNg";
  res.render("auth/ngo-signup", { errors: null, user: null });
};

// POST /join/ngo
exports.ngoSignUp = (req, res) => {
  const { ngo_name, email, link, state, password, password2 } = req.body;

  req.checkBody("ngo_name", "Organisation name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Not a valid email").isEmail();
  req.checkBody("link", "Not a valid link").isURL();
  req.checkBody("state", "State is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password", "Password too short").isLength({ min: 5 });
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
    badRequestMessage: "Please enter valid credentials",
    failureRedirect: "/login/ngo",
    failureFlash: true,
  })(req, res, next);
};

// POST update profile info
exports.updateNgoProfile = (req, res) => {
  let updatedBody = req.body;
  updatedBody.ngo_name
    ? (ngo_name = updatedBody.ngo_name)
    : (ngo_name = req.user.ngo_name);

  updatedBody.state ? (state = updatedBody.state) : (state = req.user.state);
  updatedBody.link ? (link = updatedBody.link) : (link = req.user.link);

  updatedBody.address
    ? (address = updatedBody.address)
    : (address = req.user.address);

  updatedBody.contact_name
    ? (contact_name = updatedBody.contact_name)
    : (contact_name = req.user.contact_name);

  updatedBody.contact_email
    ? (contact_email = updatedBody.contact_email)
    : (contact_email = req.user.contact_email);

  updatedBody.contact_phone
    ? (contact_phone = updatedBody.contact_phone)
    : (contact_phone = req.user.contact_phone);

  updatedBody.description
    ? (description = updatedBody.description)
    : (description = req.user.description);

  updatedBody.causes
    ? (causes = updatedBody.causes)
    : (causes = req.user.causes);

  updatedBody.reg_number
    ? (reg_number = updatedBody.reg_number)
    : (reg_number = req.user.reg_number);

  // req.checkBody("link", "Not a valid link").isURL();
  // req.checkBody("contact_phone", "Contact number is not valid").isNumeric();
  // let errors = req.validationErrors();
  // if (errors) {
  //   res.locals.title = `Dashboard | ${req.user.name}`;
  //   res.locals.user = req.user;
  //   res.render("ngo-dashboard", {
  //     errors: errors,
  //   });
  // }
  Ngo.updateOne(
    { email: req.user.email },
    {
      $set: {
        ngo_name,
        state,
        address,
        contact_name,
        contact_email,
        contact_phone,
        description,
        link,
        causes,
        reg_number,
      },
    }
  )
    .then(() => {
      req.flash("success", "Update successful");
      res.redirect("/org/dashboard");
    })
    .catch((err) => console.error(err));
};
