const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const refreshAccessToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log("hi")
    const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
    });
    
    spotifyApi
    .refreshAccessToken()
    .then((data) => {
    res.json({
    accessToken: data.body.accessToken,
    expiresIn: data.body.expiresIn,
    });
    })
    .catch((err) => {
    console.log(err);
    res.sendStatus(400);
    });
    };
    

const authorizationCodeGrant = (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    
    });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

module.exports = {
  refreshAccessToken,
  authorizationCodeGrant,
};
