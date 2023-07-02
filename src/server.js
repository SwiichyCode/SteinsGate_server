const express = require("express");
const cors = require("cors");
const app = express();

// parse requests of content-type - application/json
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require("./config/db");
require("./routes/auth")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Steins Gate application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
