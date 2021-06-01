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
  Comment.findAll({
    where: { postId: req.params.id },
    include: "User",
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(res.status(200).json({ message: "commentaire supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
  const commentObject = req.body;
  Comment.update({ ...commentObject }, { where: { id: req.params.id } })
    .then(res.status(200).json({ message: "commentaire modifié" }))
    .catch((error) => res.status(400).json({ error }));
};
