# Spotify - Full Stack Web Application (Spotify API) + Docker

Get ready to rock out with my full-stack music web app! It's the ultimate destination for music lovers who want to jam out to their favorite tunes. With my app, you can easily search for albums from your favorite artists, listen to tracks, and even create your very own favorites playlist. So what are you waiting for? Start exploring, discovering and enjoying your favorite music with my full-stack music web app!


## Setup

### Dependencies

* `cd server` and run npm install. This will install server-related dependencies such as `Express`
* `cd client` and run `npm install`. This will install client dependencies.

## Database Preparation

* Access the MySQL interface in your terminal by running `mysql -u root -p`
* Create a new database called songs: `create database songs`
* Add the `.env` file in the project directory containing the MySQL authentication information for MySQL user. For example:

  `DB_HOST=localhost`
  
  `DB_USER=root`
  
  `DB_NAME=songs`
  
  `DB_PASS=YOURPASSWORD`
  
* Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table **favorites** in your database.

## Development

* `cd server` and run `to start` the Express server on port 5000
* `cd client` and run `npm start` to start the client in development mode on port 3000.

## Spotify API  

Link: https://developer.spotify.com/documentation/web-api/tutorials/getting-started

* Create an account on the Spotify API website and follow the instructions.

* Save your own Client ID and Client Secret in the .env file in the client folder and import them into the files in the components folder

* Checkout the documentation and enjoy the ride!

## Main Features

By typing in the artist's name, users can:

- See all the albums of this artist including album details. 
- Click on an album and checkout all the tracks
- Select a track and listen to 30 seconds of the song

Music lovers can also make a list of all their favorite tracks and listen to them whenever they want:

- Click on the heart to favorite the track
- See all favorites in the favorites section 
- In the favorites section users can : click on the artist name and follow them, click on the track and listen to the song, click on the delete button to delete track   from favorites


## Technologies

* VS Code
* Docker
* Node.js
* Express.js
* API
* MySQL
* React.js
* React Bootstrap
* HTML
* CSS







<img width="960" alt="2023-04-08 (3)" src="https://user-images.githubusercontent.com/107764065/230739734-f6cfc050-911a-4fec-bb10-0e22293fea6d.png">


<img width="960" alt="2023-04-08 (13)" src="https://user-images.githubusercontent.com/107764065/230740183-9d2a6857-4688-42a9-9099-35aa2f6e193e.png">


<img width="960" alt="2023-04-08 (8)" src="https://user-images.githubusercontent.com/107764065/230739987-b73bf8a1-a396-474f-9d22-e156ee019907.png">


<img width="960" alt="2023-04-08 (10)" src="https://user-images.githubusercontent.com/107764065/230740064-5eba633c-88ee-4cf4-b191-0c0bfa66e54c.png">






