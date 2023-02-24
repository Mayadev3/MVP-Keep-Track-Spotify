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
router.post("/", async function (req, res, next) {
  let { track_id, track_name, album_image } = req.body;

  let sql = `insert into favorites (track_id, track_name, album_image) values ("${track_id}", "${track_name}", "${album_image}")`;

  try {
    await db(sql);
    let results = await db(`select * from favorites`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(`${err.message}`);
  }
});

//this delete function makes the deleteTrack function work which is in the CardView.js
router.delete("/:id", async function (req, res, next) {
  let trackId = req.params.id;

  try {
    let results = `select * from favorites where id= ${trackId}`;
    if (results.data.length === 0) {
      res.status(400).send({ error: `track not found` });
    } else {
      await db(`delete from favorites where id = ${trackId}`);
      results = await db(`select * from favorites`);
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send(`${err.message}`);
  }
});
module.exports = router;
