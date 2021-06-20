const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = (req, res, next) => {
  const { email, password, firstname, lastname, avatar, isAdmin, isActive } =
    req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        email,
        password: hash,
        firstname,
        lastname,
        avatar,
        isAdmin,
        isActive,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              avatar: user.avatar,
              isAdmin: user.isAdmin,
            },
            token: jwt.sign({ userId: user.id }, process.env.RANDOM_TOKEN, {
              expiresIn: "24h",
            }),
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email, isActive: true } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: "Mot de passe incorrect" });
            return;
          }
          res.status(200).json({
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              avatar: user.avatar,
              isAdmin: user.isAdmin,
            },
            token: jwt.sign({ userId: user.id }, process.env.RANDOM_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
