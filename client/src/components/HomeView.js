import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";

const CLIENT_ID = "00858dd1207649a1be2b9016330f67a1";
const CLIENT_SECRET = "89eb44180a6d48f7bb32b43eff007638";

export default function HomeView() {
  let [searchInput, setSearchInput] = useState("");
  let [accessToken, setAccessToken] = useState("");
  let [albums, setAlbums] = useState([]);

  useEffect(() => {
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
    //API access token
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token)); //if you put it in a console.log instead of a state you will be getting the access token in the console
  }, []);

  function handleChange(event) {
    setSearchInput(event.target.value);
    //if i put console.log(searchInput) here, it will look weird and lag one letter behind, that doesnt mean it isnt working
    //i just should put the console.log (searchInput) in line 44
  }
  function handleKeyPress(event) {
    if (event.key == "Enter") {
      // console.log("Pressed Enter");
      // console.log(searchInput);
      search();
    }
  }

  //Search
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
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist", //if i put &type=album,track then i get the albums name and name of tracks on it
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      }); //so here we are saving the id in a variable called artistId
    console.log("the artist id is:" + artistId);
    //get request with Artist ID and grab all the albums of that artist

    let returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistId +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.items);
      });

    //display those albums to the user
  }
  console.log(albums); // i am console.logging the albums outside the function so i can see if i am getting the data to be able to use it in the DOM
  return (
    <div>
      <Container>
        <InputGroup className="mb-3 mt-5" size="lg">
          <FormControl
            placeholder="Search for Artist"
            type="input"
            onKeyPress={(e) => handleKeyPress(e)}
            onChange={(e) => handleChange(e)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
          {/* mx-2 gives a margin */}
          {albums.map((album, index) => {
            console.log(album);
            return (
              <Card key={index}>
                <Card.Img src={album.images[1].url} />

                <Card.Title>{album.name}</Card.Title>
                <Card.Text>Release Date: {album.release_date}</Card.Text>
                <Button variant="warning">
                  {/* See All {album.total_tracks} tracks */}
                  <a href={album.external_urls.spotify}>Listen To Album</a>
                </Button>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

//rfc tab scaffolds the whole thing here :)
