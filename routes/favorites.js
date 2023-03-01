var express = require("express");
var router = express.Router();
const db = require("../model/helper");
//here on line 3  we imported the helper.js file that helps us connect to the database
//so here i am importing the connection itself so i can write what data to connect and what to do with
//with that data using get, post, delete, put etc...

// the backend here is what you want to do with the info in your database:

router.get("/", function (req, res, next) {
  //this is /favorites
  db(`select * from favorites ORDER BY id ASC;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//this post function makes the postTrackId work which is in the CardTracks.js

//i put the delete and post together for the love button so that if i already have that track in favorites
//dont add it again, instead delete it
router.post("/", async function (req, res, next) {
  let {
    track_id,
    track_name,
    album_image,
    album_name,
    album_link,
    artist_name,
    artist_url,
    track_preview,
  } = req.body;
  try {
    let sql = `select * from favorites where track_id= "${track_id}"`;
    let results = await db(sql);
    //if that track with that id doesnt exist and i ended up with an empty array piece in my favorites then insert it, or else delete it
    //this is all for the favorite button that toggles between adding and deleting
    if (results.data.length === 0) {
      //meaning if it is an empty array with no object in it.. usually if there is one item in an array the length is 1 but if there is nothing then the length is zero
      //here i can also say if === 1 then delete or else insert
      let sql = `insert into favorites (track_id, track_name, album_image, album_name, album_link, artist_name, artist_url, track_preview) values ("${track_id}", "${track_name}", "${album_image}", "${album_name}", "${album_link}"," ${artist_name}", "${artist_url}", "${track_preview}")`;
      await db(sql);
    } else {
      await db(`delete from favorites where track_id = "${track_id}"`);
    }

    results = await db(`select * from favorites`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(`${err.message}`);
  }
});

// so here i have to ask myself: what features do i want to add to my favorites... what do i want the user to be able to do in my favorites
//I want the user to be able to  get to see all his favorite tracks, post/add a new track he likes, delete a track
module.exports = router;
