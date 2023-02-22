import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CLIENT_ID = "00858dd1207649a1be2b9016330f67a1";
const CLIENT_SECRET = "89eb44180a6d48f7bb32b43eff007638";

export default function CardTracks() {
  let [accessToken, setAccessToken] = useState("");
  let [tracks, setTracks] = useState([]);
  let [albumIm, setAlbumIm] = useState([]);

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

    fetch(
      "https:api.spotify.com/v1/albums/" + id + "/tracks", //if i put &type=album,track then i get the albums name and name of tracks on it
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setTracks(data.items);
      });
  }, []);

  const albumImage = async (id) => {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    await fetch(
      "https://api.spotify.com/v1/albums/" + id,

      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbumIm(data.images);
      });
  };

  return (
    <div className="CardTracks">
      <div className="try-outs">helloooooo from {id}</div>
      <div className="album-tracks">
        {tracks.map((track, index) => (
          <p key={index}>{track.name}</p>
        ))}
        {tracks.map((track, index) => (
          <p key={index}>{track.track_number}</p>
        ))}

        {/* {albumIm.map((image, index) => (
          <img key={index} src={image.url} />
        ))} */}
      </div>
    </div>
  );
}
// // grab id from the url and fetch info ... useParams
// // add  in useEffect
