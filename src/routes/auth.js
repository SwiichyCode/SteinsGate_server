const authController = require("../controllers/auth");
const verifySignup = require("../middlewares/verifySignup");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/register",

    authController.register
  );
  app.post("/api/auth/login", authController.login);
};
