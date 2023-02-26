require("dotenv").config();
const mysql = require("mysql");

//this is the migration file

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

  let sql =
    //always after making changes to the table here, go to the terminal and type: npm run migrate  so it puts the changes and new columns in your sql database
    "DROP TABLE if exists favorites; CREATE TABLE favorites(id INT NOT NULL AUTO_INCREMENT, track_id VARCHAR(40) not null, track_name VARCHAR(200) not null, album_image VARCHAR(200) not null, album_name VARCHAR(300) not null, album_link VARCHAR(300) not null, PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `favorites` was successful!");

    console.log("Closing...");
  });

  con.end();
});
