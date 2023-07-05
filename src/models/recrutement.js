const mongoose = require("mongoose");

const Recrutement = mongoose.model(
  "Recrutement",
  new mongoose.Schema({
    pseudo: String,
    classe: String,
    presentation: String,
  })
);

module.exports = Recrutement;
