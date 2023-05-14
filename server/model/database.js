require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs");

//REMEMBER, to create a database you have to do it through the MySQL Command CLient and the name of the database should match the name of the database on line 18..however to create the tables, you can do it through the file migrate.sql and then type npm run migrate in the command line
//this is the migration file...which means that when i want to create a table i create it here and then i run  npm run migrate in the terminal
//so that this table is created in mySQL

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "songs",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  //CHECK OUT THIS LINK TO SEE THE DIFFERENT WAYS WE CAN GET ITEMS FROM A TABLE: https://dyclassroom.com/mysql/mysql-select-from-table
  let sql =
    //always after making changes to the table here, go to the terminal and type: npm run migrate  so it puts the changes and new columns in your sql database
    // "DROP TABLE if exists favorites; CREATE TABLE favorites(id INT NOT NULL AUTO_INCREMENT, track_id VARCHAR(40) not null, track_name VARCHAR(200) not null, album_image VARCHAR(200) not null, album_name VARCHAR(300) not null, album_link VARCHAR(300) not null, artist_name VARCHAR(200) not null, artist_url VARCHAR(200) not null, track_preview VARCHAR(300) not null, PRIMARY KEY (id));";
    //so if we create an sql file with the tables then we only need to add line 30... if we didnt create sql file then we put only line 28 here
    fs.readFileSync(`${__dirname}/migrate.sql`).toString(); //this is the string i wrote in line 27 commented out and how it is reading it from the init.db.sql file

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `favorites` was successful!");

    console.log("Closing...");
  });

  con.end();
});
