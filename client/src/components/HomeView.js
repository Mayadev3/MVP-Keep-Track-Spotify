import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import "./HomeView.css";
import { AiOutlinePlayCircle } from "react-icons/ai";

//React router is a package or component...react packages can have hooks... we can also create our own hooks
//react hooks are useEffect and useState
//we had an issue with getting the albums and the access tokens
//we are trying to get the albums and the access token at the same time
//but the access token took longer to arrive so i couldnt get the info
//to fix it, i let the useeffect of the album fetch to only fireoff
//when the accesstoken has arrived
//in the network part of the development tool, you can see waterfall which shows you
//how long it took to get the token and how look it took to get the info from the api

const CLIENT_ID = "00858dd1207649a1be2b9016330f67a1";
const CLIENT_SECRET = "89eb44180a6d48f7bb32b43eff007638";

export default function HomeView() {
  let [searchInput, setSearchInput] = useState("Cold Play");
  let [accessToken, setAccessToken] = useState("");
  let [albums, setAlbums] = useState([]);

  //USEFFECT TO GET ACCESS TOKEN
  useEffect(() => {
    console.log("useEffect");
    let authParameters = {
      //this is to fetch our access token
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    //API FETCH ACCESS TOKEN
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token)); //if you put it in a console.log instead of a state you will be getting the access token in the console
  }, []);

  //USEEFFECT TO GET ALBUMS
  //useEffect is a watcher, it looks at what is in the array, if it is empty then it fires off immediately
  //when you load the page, but when you have the accessToken in that array, then it will only fireoff
  //when the accesstoken has been received
  useEffect(() => {
    console.log("the token has changed", accessToken);
    search();
  }, [accessToken]);
  ///////////////////////////////////////////////////////////////////
  //WAS USING THIS IN THE USEEFFECT TO SHOW ALBUMS BUT CHANGED TO USING NAME INSTEED OF ARTIST ID
  //   let returnedAlbums = fetch(
  //     "https://api.spotify.com/v1/artists/" +
  //       "06HL4z0CvFAxyc27GXpf02" +
  //       "/albums" +
  //       "?include_groups=album&market=US&limit=50",
  //     searchParameters
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data);
  //       setAlbums(data.items);
  //     });
  // }, []);
  /////////////////////////////////////////////////////////////////////////
  //SEARCH FOR ALBUMS FUNCTION
  async function search() {
    // console.log(`Search for ${searchInput}`);
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    //in the fetch url to start adding variables you put a ? then put the first variable
    //we use the & to say what the next varibale is

    //get request using search to get the Artist ID
    let artistId = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=album", //if i put &type=album,track then i get the albums name and name of tracks on it
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.albums.items); //setAlbums(data.albums.items)
      }); //so here we are saving the id in a variable called artistId
    // console.log("the artist id is " + artistId);
    //get request with Artist ID and grab all the albums of that artist

    // let returnedAlbums = await fetch(
    //   "https://api.spotify.com/v1/artists/" +
    //     artistId +
    //     "/albums" +
    //     "?include_groups=album&market=US&limit=50",
    //   searchParameters
    // )
    //   //display those albums to the user
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data);//i see info of all albums
    //     setAlbums(data.items);
    //   });
  }

  //GET TRACKS OF ALBUM FUNCTION
  const getTracks = async (albumId) => {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    await fetch(
      "https:api.spotify.com/v1/albums/" + albumId + "/tracks", //if i put &type=album,track then i get the albums name and name of tracks on it
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.items;
      });

    //so here we are saving the id in a variable called artistId
    // console.log("the artist id is:" + artistId);
    //get request with Artist ID and grab all the albums of that artist
  };

  //HANDLE INPUT FIELD CHANGES
  function handleChange(event) {
    setSearchInput(event.target.value);
    //if i put console.log(searchInput) here, it will look weird and lag one letter behind, that doesnt mean it isnt working
    //i just should put the console.log (searchInput) in line 44
  }
  //HANDLING BUTTON WHEN TAPPED ON ENTER
  function handleKeyPress(event) {
    if (event.key == "Enter") {
      // console.log("Pressed Enter");
      // console.log(searchInput);
      search();
    }
  }
  // console.log(albums);
  // i am console.logging the albums outside the function
  //so i can see if i am getting the data to be able to use it in the DOM
  return (
    <div className="HomeView">
      <iframe
        src="https://giphy.com/embed/hD1TSlavNv114vTaME"
        width="160"
        height="100"
        className="giphy"
      ></iframe>{" "}
      <Container>
        <h1 className="header">
          <strong>Keep Track</strong>
        </h1>
        <InputGroup className="mb-3 mt-5" size="lg">
          <FormControl
            placeholder="Search for Artist"
            type="input"
            onKeyPress={(e) => handleKeyPress(e)}
            onChange={(e) => handleChange(e)}
          />
          <Button onClick={search} className="search-button">
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="row row-cols-4 mt-5">
          {/* mx-2 gives a margin */}
          {albums.map((album, index) => {
            return (
              <Card key={index} className="p-3 mb-4 cards">
                <Link to={`/album/${album.id}`}>
                  <Card.Img
                    src={album.images[1].url}
                    className="card-image img-fluid"
                    onClick={(e) => getTracks(album.id)} //getting tracks
                  />
                </Link>
                <div className="card-details">
                  <Card.Title className="mt-2 card-texts">
                    {album.name}
                  </Card.Title>
                  <Card.Text className="card-texts">
                    Release Date: {album.release_date}
                  </Card.Text>
                </div>
                {/* <Button className="listen-button"> */}
                {/* See All {album.total_tracks} tracks */}
                <a
                  href={album.external_urls.spotify}
                  target="_blank"
                  className="listen-link"
                >
                  <AiOutlinePlayCircle />
                </a>
                {/* </Button> */}
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

//rfc tab scaffolds the whole thing here :)
