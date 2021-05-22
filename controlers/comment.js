const { Comment } = require("../models");

exports.createComment = (req, res, next) => {
  const commentObject = req.body;
  const comment = new Comment({ ...commentObject });
  comment
    .save()
    .then(res.status(201).json({ message: "commentaire enregistré" }))
    .catch((error) => res.status(500).json(error));
};

exports.getComments = (req, res, next) => {
  Comment.findAll({ where: { postId: req.params.postId }, include: "User" })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};
