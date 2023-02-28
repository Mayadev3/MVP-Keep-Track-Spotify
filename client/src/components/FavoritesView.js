import React, { useEffect, useState } from "react";
import "./FavoritesView.css";
import { CiTrash } from "react-icons/ci";

export default function FavoritesView(props) {
  //GET THE TRACKNAMES, TRACKID, TRACKALBUM IMAGE FROM THE DATABASE
  // let [favorites, setFavorites] = useState([]);

  // useEffect(() => {
  //   getFavorites();
  // }, []);

  // const getFavorites = async () => {
  //   fetch("/api/favorites") // this is the database address
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
  //      setFavorites(data);
  //       // console.log(json);
  //     })
  //     .catch((error) => {
  //       // upon failure, show error message
  //       console.log(`Error: ${error}`);
  //     });
  // };

  // const deleteFavorite = async (id) => {
  //   let options = {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ track_id: id }),
  //   };

  //   try {
  //     let response = await fetch(`/api/favorites`, options);
  //     if (response.ok) {
  //       let data = await response.json();
  //       setFavorites(data);
  //     } else {
  //       console.log(`Server Error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Network Error: ${err.message} `);
  //   }
  // };

  return (
    <div className="FavoritesView">
      <div className="the-whole">
        <tr className="headers">
          <th className="track-header">Track/Artist</th>
          <th className="album-header">Album</th>
          <th></th>
        </tr>
        {props.favorites.map((favorite) => (
          <div key={favorite.id} className="favorites">
            <table>
              <tr>
                <td>
                  <a
                    href={favorite.album_link}
                    alt={favorite.album_name}
                    target="_blank"
                  >
                    <img src={favorite.album_image} className="fave-image" />
                  </a>
                </td>
                <td className="both-track-artist">
                  {/* here i am saying if the preview listen isn't null then put the track name in a link or else dont put it in a link */}
                  {favorite.track_preview !== "null" ? (
                    <a
                      href={favorite.track_preview}
                      target="_blank"
                      className="track-preview"
                    >
                      <p className="track-name">{favorite.track_name}</p>
                    </a>
                  ) : (
                    <p className="track-name">{favorite.track_name}</p>
                  )}
                  <a
                    href={favorite.artist_url}
                    target="_blank"
                    className="artist-link"
                  >
                    <p className="artist_name">{favorite.artist_name}</p>
                  </a>
                </td>
                <td className="both-album-buttom">
                  <p className="album-name">{favorite.album_name}</p>
                  <button
                    onClick={(e) => props.deleteFavoriteCb(favorite.track_id)}
                    className="delete-button"
                  >
                    <div className="button-info">
                      <CiTrash className="trash-icon" />{" "}
                      <span className="delete-text"> Delete</span>
                    </div>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
