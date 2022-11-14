const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,  
    password: String,
    tokens: [],
  },
  { timestamps: true }
);

UserSchema.index({
  name: "text",
});

const User = mongoose.model("user", UserSchema);

module.exports = User;