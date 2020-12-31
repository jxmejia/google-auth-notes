const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const handlebars = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const passportConfig = require("./config/passport");
const session = require("express-session");

const port = 3000;

const app = express();

// Load dotenv config
dotenv.config();

// Mongoose
connectDb();

// Passport
passportConfig(passport);

// Handlebars
app.engine(".hbs", handlebars({ defaultLayout: "main", extname: ".hbs" })); // Express template engine
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views/"));

// Express sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

app.listen(port, console.log("Listening at port 3000"));
