var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const cors = require("cors"); // add at the top

var app = express();

app.use(cors()); // add after 'app' is created... after the app=express()

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));// this is responsible for the public directory file

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
