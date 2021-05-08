const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  const { email, password, firstName, lastName, avatar, isAdmin } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        email,
        password: hash,
        firstName,
        lastName,
        avatar,
        isAdmin,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
