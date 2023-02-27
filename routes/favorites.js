var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// the backend here is what info you want to put in your database

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

//this delete function makes the deleteTrack function work which is in the CardView.js
// router.delete("/:id", async function (req, res, next) {
//   let id = req.params.id;

//   try {
//     let results = `select * from favorites where id= ${id}`;
//     if (results.data.length === 0) {
//       res.status(400).send({ error: `track not found` });
//     } else {
//       await db(`delete from favorites where id = ${id}`);
//       results = await db(`select * from favorites`);
//       res.send(results.data);
//     }
//   } catch (err) {
//     res.status(500).send(`${err.message}`);
//   }
// });
module.exports = router;
