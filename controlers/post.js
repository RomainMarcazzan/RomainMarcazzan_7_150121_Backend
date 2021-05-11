const { Post } = require("../models");

exports.createPost = (req, res, next) => {
  const { title, imageUrl, isFlaged } = req.body;
  const post = new Post({
    title,
    imageUrl,
    isFlaged,
  });
  post
    .save()
    .then(res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(500).json(error));
};
