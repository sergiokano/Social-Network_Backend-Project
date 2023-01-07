const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  songId: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;