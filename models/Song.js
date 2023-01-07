const mongoose = require("mongoose");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
// });

const spotifyApi = new SpotifyWebApi({
  clientId: "1dbe8b334ec24389932a496a87fedcfe",
  clientSecret: "545e16d28770464e9bb0c13ac4084a95",
});
const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  artist: {
    type: String,
    // required: true,
  },
  song: {
    type: String,
    // required: true,
  },
  img: {
    type: String,
    // required: true,
  },
  duration: {
    type: String,
    // required: true,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const getSongInfo = async (songId) => {
  try {
    const song = await spotifyApi.getTrack(songId);
    return {
      name: song.body.name,
      artist: song.body.artists[0].name,
      song: song.body.preview_url,
      img: song.body.album.images[0].url,
      duration: song.body.duration_ms,
    };
  } catch (error) {
    console.error(error);
  }
};

const createSong = async (songId) => {
  const songInfo = await getSongInfo(songId);
  const song = new Song(songInfo);
  return song.save();
};

const Song = mongoose.model("Song", SongSchema);

module.exports = {
  Song,
  createSong,
};
