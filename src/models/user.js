const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    pseudo: String,
    email: String,
    password: String,
    roles: [
      {
        type: String,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
