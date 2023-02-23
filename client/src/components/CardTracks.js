import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsBookmarkHeartFill } from "react-icons/bs";
import "./CardTracks.css";

//the spotify api is my source of truth the same way my
//database was the source of truth in exercises before

const CLIENT_ID = "00858dd1207649a1be2b9016330f67a1";
const CLIENT_SECRET = "89eb44180a6d48f7bb32b43eff007638";

export default function CardTracks() {
  let [accessToken, setAccessToken] = useState("");
  let [tracks, setTracks] = useState([]);
  let [album, setAlbum] = useState(null); //we put it as null cause it is originally an empty object
  let [trackId, setTrackId] = useState(null);
  const { id } = useParams();

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

  const getTrackId = async () => {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    await fetch(
      "https:api.spotify.com/v1/albums/" + id + "/tracks",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items); //track id will be track.id after looping through tracksId state
      });
  };

  //CONNECTING TO THE FAVORITES DATABASE

  //so the front end uses the route to tell the server how to manage the database in this route
  //here the front end is telling the server to get all the favorites from the database

  //those functions are me giving the user the different ways he can use my api
  //in other words what kind of data can be displayed on the screen and what you can do with it in the front end
  const getFavorites = async () => {
    fetch("/favorites")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Server error: ${response.status}: ${response.statusText}`
          );
        }
      })
      .then((data) => {
        // upon success, update tracks
        setTracks(data.items);
        // console.log(json);
      })
      .catch((error) => {
        // upon failure, show error message
        console.log(`Error: ${error}`);
      });
  };

  const addTrack = async (track_id) => {
    let newTrack = { track_id };
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrack), //this is to the backend body
    };

    try {
      let response = await fetch("/favorites", options); //here i am telling the server to add the new track to the database with all my favorites
      if (response.ok) {
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

  const deleteTrack = async (track_id) => {
    let options = {
      method: "DELETE",
    };

    try {
      let response = await fetch(`/favorites`, options);
      if (response.ok) {
        let data = await response.json();
        setTracks(data);
      } else {
        console.log(`Server Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network Error: ${err.message}`);
    }
  };

  return (
    <div className="CardTracks">
      {/* <div className="try-outs">helloooooo from {id}</div> */}
      <div className="album-details">
        <div className="album-Image">
          <img key={id} src={album?.images[1].url} />
          {/* this question mark is called optional chaining so that the when the data you want is undefined, instead of crippling your whole browser, it just shows undefined, explanation is in the objects slide.. he used it here because the object that has the image url is deeply nested..big object then array then objects again */}
        </div>
        <div className="album-trackings">
          {tracks.map((track, id) => (
            <div className="album-tracks" key={id}>
              <p>{track.track_number}</p>
              <p>
                {track.name}{" "}
                <button
                  className="fave-button"
                  onClick={(e) => {
                    getTrackId();
                  }}
                >
                  <BsBookmarkHeartFill />
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
      <p>{album?.copyrights[0].text}</p>
    </div>
  );
}

//in map... to have multiple html elements you need to wrap them in a div
