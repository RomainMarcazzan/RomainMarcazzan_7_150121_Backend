const { Comment, User } = require("../models");

exports.createComment = (req, res, next) => {
  // const commentObject = req.body;
  // const comment = new Comment({ ...commentObject });
  // comment
  //   .save()
  Comment.create({ ...req.body })
    .then(({ id, userId, comment, updatedAt }) =>
      res.status(201).json({ id, userId, comment, updatedAt })
    )
    .catch((error) => res.status(400).json(error));
};

exports.getComments = (req, res, next) => {
  Comment.findAll({
    where: { postId: req.params.id },
    attributes: ["id", "updatedAt", "comment", "userId"],
    include: {
      model: User,
      attributes: ["firstname", "lastname", "avatar", "isAdmin"],
    },
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
  Comment.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => {
      return Comment.findByPk(req.params.id, {
        attributes: ["id", "updatedAt", "comment", "userId"],
        include: {
          model: User,
          attributes: ["firstname", "lastname", "avatar", "isAdmin"],
        },
      });
    })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(400).json({ error }));
};
