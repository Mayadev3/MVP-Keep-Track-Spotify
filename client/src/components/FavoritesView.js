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
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorites">
            {/* div */}
            <div className="image-track-album">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
