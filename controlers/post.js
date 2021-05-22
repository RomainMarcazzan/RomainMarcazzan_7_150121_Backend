const { Post } = require("../models");

exports.createPost = (req, res, next) => {
  const postObject = req.body;

  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  console.log(postObject);
  post
    .save()
    .then(res.status(201).json({ message: "post enregistré" }))
    .catch((error) => res.status(500).json(error));
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll({ include: "User" })
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id }, include: "User" })
    .then((post) =>
      res.status(200).json({
        firstname: post.User.firstname,
        lastname: post.User.lastname,
        title: post.title,
        imageUrl: post.imageUrl,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};
