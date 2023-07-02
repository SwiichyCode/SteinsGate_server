const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicatePseudoOrEmail = (req, res, next) => {
  User.findOne({
    pseudo: req.body.pseudo,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failure! Pseudo is already in use!" });
      return;
    }

    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res
          .status(400)
          .send({ message: "Failure ! The email address is already used." });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignup = {
  checkDuplicatePseudoOrEmail,
  checkRolesExisted,
};

module.exports = verifySignup;
