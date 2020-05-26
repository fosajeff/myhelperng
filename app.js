// const createError = require("http-errors");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const config = require("./config/database");
const passport = require("passport");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Express Session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Express Messsages Middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      let namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

// Passport Config
require("./config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// bring in routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
// const usersRouter = require("./routes/users");

// set routes
app.use("/", indexRouter);
app.use(authRouter);
// app.use("/users", usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const PORT = process.env.PORT || 5000;

mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Database connected successfully");
    app.listen(PORT, () => console.log(`***Server running on PORT ${PORT}***`));
  })
  .catch((err) => console.log("Connection to database failed =>", err));

app.all("*", (req, res) => {
  res.send({ message: "404 - Error Page" });
});
module.exports = app;
