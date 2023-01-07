const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  desc: {
    type: String,
    required: true,
  },
  songs: {
    type: Array,
    default: [],
  },
  img: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

playlistSchema.index({
  description: "text",
});

const Song = mongoose.model("Song", playlistSchema);

module.exports = Song;