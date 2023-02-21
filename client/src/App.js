import { useEffect } from "react";
import "./App.css";

function App() {
  //we create this useeffect to make sure the front end and the backend are connected
  useEffect(() => {
    fetch("/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <div className="App">Hello There!</div>;
}

export default App;
