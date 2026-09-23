"use strict";

let express = require("express"),
    router = express.Router(),
    db = require('../db');

// Get all book titles
router.get('/', async (req, res, next) => {
    let conn;
    res.set('Access-Control-Allow-Origin', '*');

    try {
        let myJSON = [];
        let query = "SELECT * FROM book";

        // Get all books
        const book = await db.pool.query(query);

        // Loop over each book and get the title
        for (var i = 0; i < book.length; i++) {
            // use book_id to get book title
            var temp = {booktitle:'', book_id:''};
            temp.booktitle = book[i].booktitle.replace(/\\/g, "");
            temp.book_id = book[i].book_id;
            myJSON.push(temp);
        }

        res.status(200).send(myJSON);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

// GET 
router.get('/title/:"title"', async (req, res, next) => {
    let conn;
    res.set('Access-Control-Allow-Origin', '*');

    const bookTitle = req.params["title"];

    try {
        let myJSON = [];
        let query = '';
        // // use book title to get all the songs for that book
        if (bookTitle === '*') {  // get all songs!
            query = "SELECT * FROM book";
        } else {
            query = "SELECT * FROM book WHERE booktitle LIKE '%" + bookTitle + "%'"
        }
        
        const book = await db.pool.query(query);

        // Loop over each book
        if (book.length > 0) {
            for (var bLen = 0; bLen < book.length; bLen++) {
                const song = await db.pool.query("SELECT * FROM song WHERE book_id = " + book[bLen].book_id);

                // Loop over the songs in the book
                for (var sLen = 0; sLen < song.length; sLen++) {
                    // use book_id to get book title

                    // use artist_id to get artist name
                    var artist = await db.pool.query("SELECT * FROM artist WHERE artist_id = " + song[sLen].artist_id);

                    // use band_id to get band name
                    var band = await db.pool.query("SELECT * FROM band WHERE band_id = " + song[sLen].band_id);

                    // console.log(song[i]);
                    //  Format and put everything in to our JSON array for returning
                    var temp = {book_id : '', booktitle : '', song_id : '', songtitle : '', artist_id : '', artistname : '', band_id: '', bandname : '', composername : ''};
                    temp.book_id = book[bLen].book_id;
                    temp.booktitle = book[bLen].booktitle.replace(/\\/g, "");
                    temp.song_id = song[sLen].song_id;
                    temp.songtitle = song[sLen].songtitle.replace(/\\/g, "");
                    temp.artist_id = song[sLen].artist_id;
                    temp.artistname = artist.length == 0 ? "" : artist[0].artistname.replace(/\\/g, "");
                    temp.band_id = song[sLen].band_id;
                    temp.bandname = band.length == 0 ? "" : band[0].bandname.replace(/\\/g, "");
                    temp.composername = song[sLen].composer.replace(/\\/g, "");
                    myJSON.push(temp);
                }
            }
        }

        res.status(200).send(myJSON);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

module.exports = router;