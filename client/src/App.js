import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import { Routes, Route, NavLink } from "react-router-dom"; //Routes is just a container for Route
import HomeView from "./components/HomeView";
import FavoritesView from "./components/FavoritesView";
import CardTracks from "./components/CardTracks";

function App() {
  let [favorites, setFavorites] = useState([]); //setFavorites is actually a function that updates the favorites

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
    <div className="App">
      <nav className="nav">
        <NavLink to="/" className="link1">
          Home
        </NavLink>
        <NavLink to="/favorites" className="link2">
          My Favorite Tracks
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route
          path="/favorites"
          element={
            <FavoritesView
              favorites={favorites}
              deleteFavoriteCb={deleteFavorite}
            />
          }
        />
        <Route
          path="/album/:id"
          element={
            <CardTracks favorites={favorites} setFavoritesCb={setFavorites} />
          }
        />
      </Routes>
      {/* let the routes look like those of spotify */}
    </div>
  );
}

export default App;
