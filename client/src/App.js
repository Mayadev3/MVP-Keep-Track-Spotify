import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import { Routes, Route, Link } from "react-router-dom"; //Routes is just a container for Route
import HomeView from "./components/HomeView";
import FavoritesView from "./components/FavoritesView";
import CardTracks from "./components/CardTracks";

function App() {
  return (
    <div className="App">
      <nav className="nav">
        <Link to="/" className="link1">
          <iframe
            src="https://giphy.com/embed/hD1TSlavNv114vTaME"
            width="160"
            height="100"
            className="giphy-embed"
          ></iframe>{" "}
          Home
        </Link>
        <Link to="/favorites" className="link2">
          My Favorite Tracks
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/favorites" element={<FavoritesView />} />
        <Route path="/album/:id" element={<CardTracks />} />
      </Routes>
      {/* let the routes look like those of spotify */}
    </div>
  );
}

export default App;
