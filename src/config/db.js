const db = require("../models");
const Role = db.role;
require("dotenv").config();

const { MONGO_USER, MONGO_PASS } = process.env;

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Role.create({ name: "user" });
      await Role.create({ name: "moderator" });
      await Role.create({ name: "admin" });
      console.log("Roles collection initialized.");
    }
  } catch (err) {
    console.error("Error initializing roles:", err);
  }
}

db.mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.p3lol8b.mongodb.net/`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit(1);
  });
