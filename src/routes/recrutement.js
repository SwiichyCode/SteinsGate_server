const recrutementController = require("../controllers/recrutement");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/recrutement/post", recrutementController.postRecrutement);
  app.post("/api/recrutement/get", recrutementController.getAllRecrutement);
};
