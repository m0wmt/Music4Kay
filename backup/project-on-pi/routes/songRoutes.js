"use strict";

let express = require("express"),
    router = express.Router();

const songController = require('../controllers/songController');

// Define routes and map to controller methods
router.get('/', songController.getSongs);
router.get('/artist', songController.getSongsByArtist);
router.get('/band', songController.getSongsByBand);
router.get('/composer', songController.getSongsByComposer);

module.exports = router;