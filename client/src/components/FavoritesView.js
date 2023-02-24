import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FavoritesView() {
  //here i have to use the track ids and put them on screen

  // const getFavorites = async () => {
  //   fetch("/favorites")// this is the database address
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error(
  //           `Server error: ${response.status}: ${response.statusText}`
  //         );
  //       }
  //     })
  //     .then((data) => {
  //       // upon success, update tracks
  //       setTracks(data.items);
  //       // console.log(json);
  //     })
  //     .catch((error) => {
  //       // upon failure, show error message
  //       console.log(`Error: ${error}`);
  //     });
  // };

  return <div>FavoritesView</div>;
}

//first, post the spotify track ids in the database (on the button so in the cardTracks which will send the id to the post function)
//second,
