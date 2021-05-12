const { Post } = require("../models");

exports.createPost = (req, res, next) => {
  const { title, imageUrl, isFlaged, userId } = req.body;
  const post = new Post({
    title,
    imageUrl,
    isFlaged,
    userId,
  });
  post
    .save()
    .then(res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(500).json(error));
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};
