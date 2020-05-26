const LocalStrategy = require("passport-local").Strategy;
const Volunteer = require("../models/volunteers");
const Ngo = require("../models/ngo");
const config = require("../config/database");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  // Local Strategy
  passport.use(
    "volunteer-local",
    new LocalStrategy({ usernameField: "email" }, function (
      username,
      password,
      done
    ) {
      // match email
      let query = { email: username };
      Volunteer.findOne(query, function (err, user) {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Match Password
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) console.error(err);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid email or password" });
          }
        });
      });
    })
  );

  // Local Strategy
  passport.use(
    "ngo-local",
    new LocalStrategy({ usernameField: "email" }, function (
      username,
      password,
      done
    ) {
      // match email
      let query = { email: username };
      Ngo.findOne(query, function (err, user) {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Match Password
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) console.error(err);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid email or password" });
          }
        });
      });
    })
  );

  // Serialize and Deserialize

  function SessionConstructor(userId, userGroup, details) {
    (this.userId = userId), (this.userGroup = userGroup);
    this.details = details;
  }

  // Serialize
  passport.serializeUser(function (userObject, done) {
    let userGroup = "volunteer";
    let userPrototype = Object.getPrototypeOf(userObject);

    if (userPrototype === Volunteer.prototype) {
      userGroup = "volunteer";
    } else if (userPrototype === Ngo.prototype) {
      userGroup = "ngo";
    }

    let sessionConstructor = new SessionConstructor(
      userObject.id,
      userGroup,
      ""
    );
    done(null, sessionConstructor);
  });

  // Deserialize
  passport.deserializeUser(function (sessionConstructor, done) {
    if (sessionConstructor.userGroup === "volunteer") {
      Volunteer.findOne(
        {
          _id: sessionConstructor.userId,
        },
        "-volunteer.password",
        function (err, user) {
          done(err, user);
        }
      );
    } else if (sessionConstructor.userGroup === "ngo") {
      Ngo.findOne(
        {
          _id: sessionConstructor.userId,
        },
        "-ngo.password",
        function (err, user) {
          done(err, user);
        }
      );
    }
  });
};
