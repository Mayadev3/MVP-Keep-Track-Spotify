import React, { useEffect, useState } from "react";
import "./FavoritesView.css";
import { CiTrash } from "react-icons/ci";

export default function FavoritesView(props) {
  //here i am looping through my database info which was passed down from the App.js to here
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
                  {/* i put the null in "" so it is "null" cause if i go to my api in localhost:3000/api/favorites.. i see that track_preview = "null" which is a json format */}
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
