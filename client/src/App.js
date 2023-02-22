import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import { Routes, Route, Link } from "react-router-dom"; //Routes is just a container for Route
import HomeView from "./components/HomeView";
import UserView from "./components/UserView";
import CardTracks from "./components/CardTracks";

function App() {
  // const [data, setData] = useState([]);
  //we create this useeffect to make sure the front end and the backend are connected

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div className="App">
      Hello There!
      <nav>
        <Link to="/">Home</Link> | <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/users" element={<UserView />} />
        <Route path="/tracks" element={<CardTracks />} />
      </Routes>
    </div>
  );
}

export default App;
