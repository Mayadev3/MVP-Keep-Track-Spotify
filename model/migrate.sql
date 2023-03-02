--This is what Jim told us to do to send the data in our database table to the other coder:
--MVP coders: Make sure your README includes installation instructions. This includes a init_db.sql file so the FE coder can create the DB tables (and possibly add default data). If you don’t have a init_db.sql file, then export the contents of your DB into an SQL file. From the terminal: mysqldump mvpdb > init_db.sql
--So i had to create an init_db.sql file and in this case i am calling it migrate.sql and created the info and data here
--then i had to go to the database.js and type what i wrote on line 3 and line 28
--then i had to go to the terminal and write npm run migrate
--the reason why it wasnt working is cause i copied the content of the init_db.sql file
--and just edited the content which was wrong cause the character format was wrong and it kept jumping to UTF-16
-- so the way to solve it, Germinal just created a new file called migrate.sql and created the teable here and it worked
-- suchs a simple mistake 

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
  `id` int NOT NULL AUTO_INCREMENT,
  `track_id` varchar(40) NOT NULL,
  `track_name` varchar(200) NOT NULL,
  `album_image` varchar(200) NOT NULL,
  `album_name` varchar(255) NOT NULL,
  `album_link` varchar(255) NOT NULL,
  `artist_name` varchar(255) NOT NULL,
  `artist_url` varchar(255) NOT NULL,
  `track_preview` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);


-- LOCK TABLES `favorites` WRITE;


 INSERT INTO `favorites` VALUES (5,'1dNIEtp7AY3oDAKCGg2XkH','Something Just Like This','https://i.scdn.co/image/ab67616d00004851f79b7f08426e2899a832d3e6','Something Just Like This','https://open.spotify.com/album/7IzpJkWQqgz1BTutQvSitX',' The Chainsmokers','https://open.spotify.com/artist/69GGBxA162lTqCwzJG5jLp','https://p.scdn.co/mp3-preview/f14eb152b642c9ada3386e781ee6e442afb9cdd9?cid=00858dd1207649a1be2b9016330f67a1'),(6,'38Vb1J5W5LOs0i7SAF76pa','Can\'t Buy Me Love - Remastered 2015','https://i.scdn.co/image/ab67616d00004851582d56ce20fe0146ffa0e5cf','1 (Remastered)','https://open.spotify.com/album/7vEJAtP3KgKSpOHVgwm3Eh',' The Beatles','https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2','null'),(54,'7J8e4j9B3CeKSrO55sKwov','I Guess That\'s Why They Call It The Blues','https://i.scdn.co/image/ab67616d0000485170c8de84ff4783f90e1ebb04','Revamp: The Songs Of Elton John & Bernie Taupin','https://open.spotify.com/album/2w667CqWz0JWkhxP7IfijA',' Various Artists','https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of','null'),(59,'3lFwSDBCNo3CcN09UppUnm','Hold Me Closer','https://i.scdn.co/image/ab67616d00004851775800e93752168c8004b59f','The Lockdown Sessions','https://open.spotify.com/album/4y1qhmoZxvSyymJ1wZCtLE',' Elton John','https://open.spotify.com/artist/3PhoLpVuITZKcymswpck5b','null'),(61,'5qPGi9p8VqcizfdgWxtmLt','Lovers in Japan','https://i.scdn.co/image/ab67616d00004851e21cc1db05580b6f2d2a3b6e','Viva La Vida or Death and All His Friends','https://open.spotify.com/album/1CEODgTmTwLyabvwd7HBty',' Coldplay','https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU','https://p.scdn.co/mp3-preview/74220535659ca22574b691992a6efe577015977e?cid=00858dd1207649a1be2b9016330f67a1'),(69,'7IX7VAXujvcZ3e1PG7sGP7','Kaleidoscope','https://i.scdn.co/image/ab67616d000048518ff7c3580d429c8212b9a3b6','A Head Full of Dreams','https://open.spotify.com/album/3cfAM8b8KqJRoIzt3zLKqw',' Coldplay','https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU','https://p.scdn.co/mp3-preview/c23305ecee6f6a70e2c9323e18dbb6d9b56ddc7b?cid=00858dd1207649a1be2b9016330f67a1');


-- UNLOCK TABLES;
