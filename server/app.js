var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//this file app.js was created when installing express.. this is the link which shows how express
//tells us to scaffold : https://expressjs.com/en/starter/generator.html

var indexRouter = require("./routes/index"); //here i am importing the index file that is in routes
var favoritesRouter = require("./routes/favorites"); //here i am importing favorites file in routes

const cors = require("cors"); // add at the top
const { start } = require("repl");

var app = express();

app.use(cors()); // add after 'app' is created... after the app=express()

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));// this is responsible for the public directory file

app.use("/api", indexRouter); //here i am connecting all the methods i apply in index.js with my /api route
app.use("/api/favorites", favoritesRouter); //here i am also saying all the methods i create in the favorites.js file apply them in /api/favorites route
//in a nutshell i am saying that apply every method on how to handle which data that i wrote in the indexRouter or favoritesRouter in this specific route

//SUPER COOL THING: just like postman.. if in my browser i write: localhost:3000/api/favorites.. i see my entire api ...or in other words..my entire databse in json format

module.exports = app;
