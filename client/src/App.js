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
      <Link to="/" className="nav-link">
        Home
      </Link>{" "}
      <Link to="/favorites" className="nav-link">
        My Favorite Tracks
      </Link>
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
