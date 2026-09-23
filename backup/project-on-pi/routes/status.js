"use strict";

let express = require("express"),
    router = express.Router(),
    db = require('../db');

// GET 
router.get("/", async (req, res, next) => {
    let conn;
    res.set('Access-Control-Allow-Origin', '*');

    try {
            // Get number of books
            const book = await db.pool.query(
                "SELECT COUNT(*) row_count FROM book");

            // Get number of songs
            const songs = await db.pool.query(
                "SELECT COUNT(*) row_count FROM song");

            // Get number of artists
            const artists = await db.pool.query(
                "SELECT COUNT(*) row_count FROM artist");

            // Get number of bands
            const bands = await db.pool.query(
                "SELECT COUNT(*) row_count FROM band");

            // Get database size
            const dbsize = await db.pool.query(
                "SELECT table_schema 'dbname', ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) 'dbsize' FROM information_schema.tables WHERE table_schema = 'sheetmusic';");
            
            // Get last backup date/time
            const backup = await db.pool.query(
                "SELECT * FROM backup");

            //console.log(backup);

            //console.log(Number(dbsize[0].dbsize));
            //console.log(sheetmusicSize);

            let myJSON = [{
                books: Number(book[0].row_count),
                songs: Number(songs[0].row_count),
                artists: Number(artists[0].row_count),
                bands: Number(bands[0].row_count),
                dbsize: Number(dbsize[0].dbsize),
                backup: backup[0].last_backup
            }];
        res.send(myJSON);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

module.exports = router;