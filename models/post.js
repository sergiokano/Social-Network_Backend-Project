const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Text is required"],
    default: "",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    },
  ],
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.index({
  description: "text",
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
