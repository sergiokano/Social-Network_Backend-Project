const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
			validator: (value) => validate({ name: value }).error === null,
			message: "Please provide a valid name for the song.",
		},
  },
  artist: {
    type: String,
    required: true,
    validate: {
			validator: (value) => validate({ artist: value }).error === null,
			message: "Please provide a valid artist for the song.",
		},
  },
  song: {
    type: String,
    required: true,
    validate: {
			validator: (value) => validate({ song: value }).error === null,
			message: "Please provide a valid song file.",
		},
  },
  img: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[0-9]+:[0-5][0-9]$/.test(value),
      message:
        "Please provide a valid duration for the song in the format MM:SS.",
    },
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
