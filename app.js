var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var favoritesRouter = require("./routes/favorites"); //this is the positions of the files

const cors = require("cors"); // add at the top
const { start } = require("repl");

var app = express();

app.use(cors()); // add after 'app' is created... after the app=express()

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));// this is responsible for the public directory file

app.use("/api", indexRouter);
app.use("/api/favorites", favoritesRouter);
//when i am using the file favorites.js i am going to this route
//  and /api/favorites or /api/something for all the extra routes
module.exports = app;
