import React, { useState } from "react";

export default function CardTracks(props) {
  return (
    <div className="CardTracks">
      <div className="album-image">
        <img src="#" />
      </div>
      <div className="album-tracks">
        {props.getTracksCb.map((item, index) => (
          <p>{item.name}</p>
        ))}
      </div>
    </div>
  );
}
