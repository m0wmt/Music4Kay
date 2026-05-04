"use strict";

let express = require("express"),
    router = express.Router(),
    db = require('../db');

// Import necessary modules (if any)
const getSongs = (req, res) => {
  console.log("getSongs");
  const title = req.query.title;
  // console.log(req.query.title);
  // console.log(req.query.id);
  if (title == null) {
    console.log("title is null");
  } else {
    console.log(title);
  }

  // Your logic to retrieve songs from a database or service
  res.send('Retrieving all users');
};

const getSongsByArtist = (req, res) => {
  const artist = req.query.name;

  console.log("getSongsByArtist: ", artist);

  res.send(`Retrieving songs with Artist: ${artist}`);
};

const getSongsByBand = (req, res) => {
  const band = req.query.name;

  console.log("getSongsByBand: ", band);

  // Logic to retrieve user by ID
  res.send(`Retrieving songs with Band: ${band}`);
};

const getSongsByComposer = (req, res) => {
  const composer = req.query.name;

  console.log("getSongsByComposer: ", composer);

  // Logic to retrieve user by ID
  res.send(`Retrieving songs with Composer: ${composer}`);
};

// GET
router.get('/song/:"title"', async (req, res, next) => {
  let conn;
  res.set('Access-Control-Allow-Origin', '*');

  const songTitle = req.params["title"];

  try {
    let myJSON = [];
    let query = '';
    // use songtitle to get song_id, band_id, artist_id
    if (songTitle === '*') { // get all songs!
      query = "SELECT * FROM song";
    } else {
      query = "SELECT * FROM song WHERE songtitle LIKE '%" + songTitle + "%'"
    }
    const song = await db.pool.query(query);

    // Loop over the song, could be in many books
    for (var i = 0; i < song.length; i++) {
      // use book_id to get book title
      var book = await db.pool.query("SELECT * FROM book WHERE book_id = " + song[i].book_id);

      // use artist_id to get artist name
      var artist = await db.pool.query("SELECT * FROM artist WHERE artist_id = " + song[i].artist_id);

      // use band_id to get band name
      var band = await db.pool.query("SELECT * FROM band WHERE band_id = " + song[i].band_id);

      // Format and put everything in to our JSON array for returning
      var temp = {booktitle : '', songtitle : '', artistname : '', bandname : '', composername : ''};
      temp.booktitle = book[0].booktitle.replace(/\\/g, "");
      temp.songtitle = song[i].songtitle.replace(/\\/g, "");
      temp.artistname = artist.length == 0 ? "" : artist[0].artistname.replace(/\\/g, "");
      temp.bandname = band.length == 0 ? "" : band[0].bandname.replace(/\\/g, "");
      temp.composername = song[i].composer.replace(/\\/g, "");
      myJSON.push(temp);
    }

    res.status(200).send(myJSON);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn)
      return conn.release();
  }
});

// GET
router.get('/artist/:"name"', async (req, res, next) => {
  let conn;
  res.set('Access-Control-Allow-Origin', '*');

  const artistName = req.params["name"];
  try {
    let myJSON = [];
    let query = '';
    // use songtitle to get song_id, band_id, artist_id
    if (artistName === '*') { // get all songs!
      query = "SELECT * FROM artist";
    } else {
      query = "SELECT * FROM artist WHERE artistname LIKE '%" + artistName + "%'"
    }

    const artist = await db.pool.query(query);
    if (artist.length > 0) {
      // Loop over all artists found, could be many if names alike or all selected
      for (var aLen = 0; aLen < artist.length; aLen++) {
        query = "SELECT * FROM song WHERE artist_id = " + artist[aLen].artist_id;
        let song = await db.pool.query(query);

        // Loop over the song, could be in many books
        for (var i = 0; i < song.length; i++) {
          // use book_id to get book title
          var book = await db.pool.query("SELECT * FROM book WHERE book_id = " + song[i].book_id);

          // use band_id to get band name
          var band = await db.pool.query("SELECT * FROM band WHERE band_id = " + song[i].band_id);

          // Format and put everything in to our JSON array for returning
          var temp = {booktitle : '', songtitle : '', artistname : '', bandname : '', composername : ''};
          temp.booktitle = book[0].booktitle.replace(/\\/g, "");
          temp.songtitle = song[i].songtitle.replace(/\\/g, "");
          temp.artistname = artist[aLen].artistname.replace(/\\/g, "");
          temp.bandname = band.length == 0 ? "" : band[0].bandname.replace(/\\/g, "");
          temp.composername = song[i].composer.replace(/\\/g, "");
          myJSON.push(temp);
        }
      }
    }

    res.status(200).send(myJSON);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn)
      return conn.release();
  }
});

// GET
router.get('/band/:"name"', async (req, res, next) => {
  let myJSON = [];
  let query = '';
  let conn;
  res.set('Access-Control-Allow-Origin', '*');

  const bandName = req.params["name"];
  try {
    // use songtitle to get song_id, band_id, artist_id
    if (bandName === '*') { // get all songs!
      query = "SELECT * FROM band";
    } else {
      query = "SELECT * FROM band WHERE bandname LIKE '%" + bandName + "%'"
    }

    const band = await db.pool.query(query);
    if (band.length > 0) {
      // Loop over all bands
      for (var bLen = 0; bLen < band.length; bLen++) {
        query = "SELECT * FROM song WHERE band_id = " + band[bLen].band_id;
        let song = await db.pool.query(query);
        // Loop over the song, could be in many books
        for (var i = 0; i < song.length; i++) {
          // use book_id to get book title
          var book = await db.pool.query("SELECT * FROM book WHERE book_id = " + song[i].book_id);

          // use artist_id to get artist name
          var artist = await db.pool.query("SELECT * FROM artist WHERE artist_id = " + song[i].artist_id);

          // Format and put everything in to our JSON array for returning
          var temp = {booktitle : '', songtitle : '', artistname : '', bandname : '', composername : ''};
          temp.booktitle = book[0].booktitle.replace(/\\/g, "");
          temp.songtitle = song[i].songtitle.replace(/\\/g, "");
          temp.artistname = artist.length == 0 ? "" : artist[0].artistname.replace(/\\/g, "");
          temp.bandname = band[bLen].bandname.replace(/\\/g, "");
          temp.composername = song[i].composer.replace(/\\/g, "");
          myJSON.push(temp);
        }
      }
    }

    res.status(200).send(myJSON);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn)
      return conn.release();
  }
});

// GET
router.get('/composer/:"name"', async (req, res, next) => {
  let conn;
  res.set('Access-Control-Allow-Origin', '*');

  const composer = req.params["name"];

  try {
    let myJSON = [];
    let query = '';
    // use composer to get song_id, band_id, artist_id
    if (composer === '*') { // get all songs!
      query = "SELECT * FROM song";
    } else {
      query = "SELECT * FROM song WHERE composer LIKE '%" + composer + "%'"
    }
    const song = await db.pool.query(query);

    // Loop over the song, could be in many books
    for (var i = 0; i < song.length; i++) {
      // use book_id to get book title
      var book = await db.pool.query("SELECT * FROM book WHERE book_id = " + song[i].book_id);

      // use artist_id to get artist name
      var artist = await db.pool.query("SELECT * FROM artist WHERE artist_id = " + song[i].artist_id);

      // use band_id to get band name
      var band = await db.pool.query("SELECT * FROM band WHERE band_id = " + song[i].band_id);

      // Format and put everything in to our JSON array for returning
      var temp = {booktitle : '', songtitle : '', artistname : '', bandname : '', composername : ''};
      temp.booktitle = book[0].booktitle.replace(/\\/g, "");
      temp.songtitle = song[i].songtitle.replace(/\\/g, "");
      temp.artistname = artist.length == 0 ? "" : artist[0].artistname.replace(/\\/g, "");
      temp.bandname = band.length == 0 ? "" : band[0].bandname.replace(/\\/g, "");
      temp.composername = song[i].composer.replace(/\\/g, "");
      myJSON.push(temp);
    }

    res.status(200).send(myJSON);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn)
      return conn.release();
  }
});

// GET
router.get('/songid/:"song_id"', async (req, res, next) => {
  let conn;
  res.set('Access-Control-Allow-Origin', '*');

  const song_id = req.params["song_id"];

  // console.log(song_id);

  try {
    let myJSON = [];
    let query = "SELECT * FROM song WHERE song_id='" + song_id + "'"

    const song = await db.pool.query(query);

    // Loop over the song, could be in many books
    for (var i = 0; i < song.length; i++) {
      // use book_id to get book title
      var book = await db.pool.query("SELECT * FROM book WHERE book_id = " + song[i].book_id);

      // use artist_id to get artist name
      var artist = await db.pool.query("SELECT * FROM artist WHERE artist_id = " + song[i].artist_id);

      // use band_id to get band name
      var band = await db.pool.query("SELECT * FROM band WHERE band_id = " + song[i].band_id);

      // Format and put everything in to our JSON array for returning
      var temp = {booktitle : '', songtitle : '', artistname : '', bandname : '', composername : ''};
      temp.booktitle = book[0].booktitle.replace(/\\/g, "");
      temp.songtitle = song[i].songtitle.replace(/\\/g, "");
      temp.artistname = artist.length == 0 ? "" : artist[0].artistname.replace(/\\/g, "");
      temp.bandname = band.length == 0 ? "" : band[0].bandname.replace(/\\/g, "");
      temp.composername = song[i].composer.replace(/\\/g, "");
      myJSON.push(temp);
    }

    res.status(200).send(myJSON);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn)
      return conn.release();
  }
});

// POST
router.post("/", async (req, res, next) => {
  let conn;
  const {book, music, artist, band, composer} = req.body;

  console.log(req.body);

  if (book.length == 0 || music.length == 0) {
    res.status(300).send('ERROR: Must provide a book title and music title!');
  } else if (artist.length == 0 && band.length == 0 && composer.length == 0) {
    res.status(301).send('ERROR: Must provide an artist, band or composer!');
  } else {
    let booktitle = book.replace(/\'/g, "\\'"); // To cope with single quotes in the string
    let songtitle = music.replace(/\'/g, "\\'");
    let artistname = artist.replace(/\'/g, "\\'");
    let bandname = band.replace(/\'/g, "\\'");
    let composername = composer.replace(/\'/g, "\\'");

    let bandid = null;
    let artistid = null;

    try {
      // If book doesn't exist insert it - we want the book id either way to continue
      let bookid = 0;
      let result = await db.pool.query("SELECT * FROM book WHERE booktitle = '" + booktitle + "'");
      if (result.length == 0) { // Not in the database, insert and get id
        result = await db.pool.query("INSERT INTO book(booktitle) values(?) RETURNING book_id", [ booktitle ]);
        bookid = result[0].book_id;
      } else { // Book exists, get id
        bookid = result[0].book_id;
      }

      // Insert the artist (optional) as above
      if (artist.length > 0) {
        result = await db.pool.query("SELECT * FROM artist WHERE artistname = '" + artistname + "'");
        if (result.length == 0) { // Not in the database, insert and get id
          result = await db.pool.query("INSERT INTO artist(artistname) values(?) RETURNING artist_id", [ artistname ]);
          artistid = result[0].artist_id;
        } else { // Artist exists, get id
          artistid = result[0].artist_id;
        }
      }

      // Insert the band (optional) as above
      if (band.length > 0) {
        result = await db.pool.query("SELECT * FROM band WHERE bandname = '" + bandname + "'");
        if (result.length == 0) { // Not in the database, insert and get id
          result = await db.pool.query("INSERT INTO band(bandname) values(?) RETURNING band_id", [ bandname ]);
          bandid = result[0].band_id;
        } else { // Band exists, get id
          bandid = result[0].band_id;
        }
      }

      // Insert the song (required) as above
      let songid = 0;
      result = await db.pool.query(
          "INSERT INTO song(songtitle, composer, book_id, band_id, artist_id) values(?, ?, ?, ?, ?) RETURNING song_id",
          [ songtitle, composername, bookid, bandid, artistid ]);
      songid = result[0].song_id;

      // Insert bookid and songid into joining song_book table for many-to-one
      // relationship (a song can be in many books)
      result = await db.pool.query("INSERT IGNORE INTO song_book(song_id, book_id) values(?, ?)", [ songid, bookid ]);

      res.status(200).send("Successfully added new book/song");
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (conn)
        return conn.release();
    }
  }
});

module.exports = {
  getSongs,
  getSongsByArtist,
  getSongsByBand,
  getSongsByComposer
};