const express = require('express');
const router = express.Router();

const spotifyController = require('../controllers/SpotifyController');

router.post('/refresh', spotifyController.refreshAccessToken);
router.post('/login', spotifyController.authorizationCodeGrant);

module.exports = router;