const mongoose = require("mongoose");

const Recrutement = mongoose.model(
  "Recrutement",
  new mongoose.Schema({
    presentation: {
      pseudo: String,
      disponibilites: String,
      discord: String,
    },
    personnages: [
      {
        classe: String,
        ilvl: Number,
      },
    ],
  })
);

module.exports = Recrutement;
