import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import { Routes, Route, Link } from "react-router-dom"; //Routes is just a container for Route
import HomeView from "./components/HomeView";
import UserView from "./components/UserView";

function App() {
  const [data, setData] = useState([]);
  //we create this useeffect to make sure the front end and the backend are connected
  // useEffect(() => {
  //   fetch("/")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);
  // useEffect(() => {
  //   // declare the async data fetching function
  //   const fetchData = async () => {
  //     // get the data from the api
  //     const response = await fetch("/");
  //     // convert the data to json
  //     const json = await response.json();

  //     // set state with the result
  //     setData(json);
  //     console.log(data);
  //   };
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
      </Routes>
    </div>
  );
}

export default App;
