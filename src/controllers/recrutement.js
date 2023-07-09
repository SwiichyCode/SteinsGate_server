const Recrutement = require("../models/recrutement");

exports.postRecrutement = async (req, res) => {
  const { presentation, personnages } = req.body;

  try {
    const newRecrutement = new Recrutement({
      presentation,
      personnages,
    });
    await newRecrutement.save();

    res.json({ message: "Recrutement posted successfully" });
  } catch (error) {
    console.error("Error during recrutement post", error);
    res.status(500).json({ error: "Error during recrutement post" });
  }
};

exports.getAllRecrutement = async (req, res) => {
  try {
    const recrutements = await Recrutement.find();

    res.json(recrutements);
  } catch (error) {
    console.error("Error during recrutement fetching", error);
    res.status(500).json({ error: "Error during recrutement fetching" });
  }
};
