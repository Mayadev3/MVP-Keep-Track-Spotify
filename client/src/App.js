import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import { Routes, Route, NavLink } from "react-router-dom"; //Routes is just a container for Route
import HomeView from "./components/HomeView";
import FavoritesView from "./components/FavoritesView";
import CardTracks from "./components/CardTracks";

function App() {
  let [favorites, setFavorites] = useState([]); //setFavorites is actually a function that updates the favorites

  //always put all the database info in the App.js to pass it down easily to children and siblings
  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    fetch("/api/favorites") // this is the database address and i am getting all my data from this route.. if i go to localhost:3000/api/favorites i will see my api array of objects there
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
    //even though it is a delete, i put a post in the method cause in my favorites route it was a post and in it there was a post and delete
    let options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ track_id: id }), //always json.stringify is an object
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
        {/* with the NavLink automatically if i have an active class in my style sheet it applies the color i want to the link i click on automatically.. it recognizes the active class automatically */}
        <NavLink to="/" className="link1">
          Home
        </NavLink>
        <NavLink to="/favorites" className="link2">
          My Favorite Tracks
        </NavLink>
      </nav>
      {/* in the routes i am saying that everything i do and include in this component apply it to this route the same way in the backened everything i do in the favorites.js file show it in the /api/favorites route */}
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
            <CardTracks favorites={favorites} setFavoritesCb={setFavorites} /> //the reason i passed the favorites state to the CardTracks component is so it is connected to my array of favorites cause my love button needs to know what tracks are available in my favorites database and which arent so it knows when to insert and when to delete
            //usually when we pass a state to another component, it is to use that data in the other component BUT this time we sent the state and the setState cause we need to pass this data we have here in my database to the CardTracks so the love button can keep track of how my data in my favorites is changing
          }
        />
      </Routes>
      {/* let the routes look like those of spotify */}
    </div>
  );
}

export default App;
