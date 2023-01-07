const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },

  created: {
    type: Date,
    default: Date.now,
  },
});

SongSchema.index({
  description: "text",
});

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;
