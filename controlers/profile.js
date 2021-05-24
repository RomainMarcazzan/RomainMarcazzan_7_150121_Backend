const { User } = require("../models");

exports.modifyUser = (req, res, next) => {
  const userObject = req.body;
  User.update(
    {
      ...userObject,
      avatar: `${req.protocol}://${req.get("host")}/avatars/${
        req.file.filename
      }`,
    },
    { where: { id: req.params.id } }
  )
    .then(res.status(200).json({ message: "utilisateur modifié" }))
    .catch((error) => res.status(400).json({ error }));
};
