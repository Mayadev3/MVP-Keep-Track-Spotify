import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { BsBookmarkHeartFill } from "react-icons/bs";
import { GiSelfLove } from "react-icons/gi";
import "./CardTracks.css";

//the spotify api is my source of truth the same way my
//database was the source of truth in exercises before

const CLIENT_ID = "00858dd1207649a1be2b9016330f67a1";
const CLIENT_SECRET = "89eb44180a6d48f7bb32b43eff007638";

export default function CardTracks() {
  let [accessToken, setAccessToken] = useState("");
  let [tracks, setTracks] = useState([]);
  let [album, setAlbum] = useState(null); //we put it as null cause it is originally an empty object
  let [loved, setLoved] = useState(false);
  const { id } = useParams(); //this is a way to pass the album.id from the homeview to here and use it in my fetches instead of in a state

  useEffect(() => {
    let authParameters = {
      //this is to fetch our access token
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    //API FETCH ACCESS TOKEN
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token)); //if you put it in a console.log instead of a state you will be getting the access token in the console
  }, []);

  useEffect(() => {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    fetch("https:api.spotify.com/v1/albums/" + id + "/tracks", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        setTracks(data.items); //track id will be track.id after looping through tracks
      });

    fetch(
      "https://api.spotify.com/v1/albums/" + id,

      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbum(data);
      });
  }, [accessToken]);

  //////////////////////////////////////////////////////////////////////////

  //CONNECTING TO THE FAVORITES DATABASE

  //so the front end uses the route to tell the server how to manage the database in this route
  //here the front end is telling the server to get all the favorites from the database

  //those functions are me giving the user the different ways he can use my api
  //in other words what kind of data can be displayed on the screen and what you can do with it in the front end

  //WHEN I CLICK ON FAVORITES, INSERT THE TRACK ID, TRACK NAME AND ALBUM IMAGE INTO THE DATABASE
  //with the console.log you can see how the ids are added to the array of objects
  //when i click on the heart, in my console i will see an array objects with the track id and when i go to postman and click get in the /api/favorites i will see how it has been added
  const postTrack = async (
    trackId,
    trackName,
    albumImage,
    albumName,
    albumLink,
    artistName,
    artistUrl,
    trackPreview
  ) => {
    let searchParameters = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        track_id: trackId,
        track_name: trackName,
        album_image: albumImage,
        album_name: albumName,
        album_link: albumLink,
        artist_name: artistName,
        artist_url: artistUrl,
        track_preview: trackPreview,
      }),
    };

    await fetch("/api/favorites", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  // ADDING TRACKS FOR FAVORITES USING POST SO IT SHOWS IN THE FavoritesView
  const addTrack = async (
    track_id,
    track_name,
    album_image,
    album_name,
    album_link,
    artist_name,
    artist_url,
    track_preview
  ) => {
    let newTrack = {
      track_id,
      track_name,
      album_image,
      album_name,
      album_link,
      artist_name,
      artist_url,
      track_preview,
    };
    //here i am saying put the newTrack in the object with the key called track_id to look like this { "track_id": "newTrack"}
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrack), //this is to the backend body
    };

    try {
      let response = await fetch("/api/favorites", options); //here i am telling the server to add the new track to the database with all my favorites
      if (response.ok) {
        //response.ok is saying if it has been added successfully in the backend database then put the response in json format and put it in a front end state
        let data = await response.json();
        //here the front end is saying hey server, if you were able to add the track to the database, then bring all my favorite tracks back and put them in a state so i can access them in the front end
        setTracks(data);
      } else {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  const toggle = (trackId) => {
    let newTracks = [...tracks];
    let trackVar = newTracks.find((tracky) => tracky.id === trackId);
    trackVar.active = !trackVar.active;
    setTracks((tracks) => newTracks);
  };

  return (
    <div className="CardTracks">
      {/* <div className="try-outs">helloooooo from {id}</div> */}
      <div className="album-details">
        <div className="album-Image">
          <a href={album?.external_urls.spotify} target="_blank">
            <img key={id} src={album?.images[1].url} className="image" />
          </a>
          {/* this question mark is called optional chaining so that the when the data you want is undefined, instead of crippling your whole browser, it just shows undefined, explanation is in the objects slide.. he used it here because the object that has the image url is deeply nested..big object then array then objects again */}
        </div>
        <div className="album-trackings">
          {tracks.map((track, id) => (
            <ul className="album-tracks" key={id}>
              <li>
                <div className="both-number-track">
                  <span className="track-number">{track.track_number}</span>
                  <a
                    href={track.preview_url}
                    target="_blank"
                    className="track-listen"
                  >
                    {track.name}{" "}
                  </a>
                </div>
                <div className="love-container">
                  <button
                    className="fave-button"
                    onClick={(e) => {
                      postTrack(
                        track.id,
                        track.name,
                        album?.images[2].url,
                        album?.name,
                        album.external_urls.spotify,
                        album.artists[0].name,
                        album.artists[0].external_urls.spotify,
                        track.preview_url
                      );
                      toggle(id);
                      //this is after the looping on line 130 and then i am sending the track.id up as a parameter to line 76 along with the others
                    }}
                  >
                    {/* <BsBookmarkHeartFill /> */}
                    {<GiSelfLove className={loved ? "active" : null} />}
                    {/* this is how you can put a class and a condition in the
                  className: className={"pass " + loved ? "active" : null} */}
                  </button>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <p className="copy-rights">{album?.copyrights[0].text}</p>
    </div>
  );
}

//in map... to have multiple html elements you need to wrap them in a div
