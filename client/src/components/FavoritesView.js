import React, { useEffect, useState } from "react";
import "./FavoritesView.css";
import { CiTrash } from "react-icons/ci";
import Giveaway from "./Giveaway.png";

export default function FavoritesView() {
  //GET THE TRACKNAMES, TRACKID, TRACKALBUM IMAGE FROM THE DATABASE
  let [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    fetch("/api/favorites") // this is the database address
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
        setFavorites(data);
        // console.log(json);
      })
      .catch((error) => {
        // upon failure, show error message
        console.log(`Error: ${error}`);
      });
  };

  const deleteFavorite = async (id) => {
    let options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ track_id: id }),
    };

    try {
      let response = await fetch(`/api/favorites`, options);
      if (response.ok) {
        let data = await response.json();
        setFavorites(data);
      } else {
        console.log(`Server Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network Error: ${err.message} `);
    }
  };

  return (
    <div className="FavoritesView">
      <div className="the-whole">
        <tr>
          <th></th>
          <th className="album-header">Album</th>
          <th></th>
        </tr>
        {favorites.map((favorite) => (
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
                  <a
                    href={favorite.track_preview}
                    target="_blank"
                    className="track-preview"
                  >
                    <p className="track-name">{favorite.track_name}</p>
                  </a>
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
                    onClick={(e) => deleteFavorite(favorite.track_id)}
                    className="delete-button"
                  >
                    <div className="button-info">
                      <CiTrash className="trash-icon" />{" "}
                      <span className="delete-text"> Delete</span>
                    </div>
                  </button>
                </td>
              </tr>
              {/* <div className="image-track-album">
                <a
                  href={favorite.album_link}
                  alt={favorite.album_name}
                  target="_blank"
                >
                  <img src={favorite.album_image} className="fave-image" />
                </a>
                <div className="both-names">
                  <p className="track-name">{favorite.track_name}</p>
                  <p className="album-name">{favorite.album_name}</p>
                </div>
              </div>
              <div className="the-delete">
                <button
                  onClick={(e) => deleteFavorite(favorite.track_id)}
                  className="delete-button"
                >
                  <div className="button-info">
                    <CiTrash className="trash-icon" />{" "}
                    <span className="delete-text"> Delete</span>
                  </div>
                </button>
              </div> */}
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
