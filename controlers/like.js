const { Like } = require("../models");

exports.createLike = (req, res, next) => {
  const likeObject = req.body;
  Like.findOne({
    where: { userId: likeObject.userId, postId: likeObject.postId },
  })
    .then((likeFound) => {
      if (likeFound) {
        Like.destroy({ where: { id: likeFound.id } })
          .then(res.status(201).json({ isLiked: false }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        const like = new Like({ ...likeObject });
        like
          .save()
          .then(res.status(201).json({ isLiked: true }))
          .catch((error) => res.status(500).json(error));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneLike = (req, res, next) => {
  Like.findAll({
    where: { postId: req.params.id },
  })
    .then((like) => res.status(200).json(like))
    .catch((error) => res.status(400).json({ error }));
};
