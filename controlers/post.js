const { Post, User } = require("../models");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  console.log("req", postObject);
  const post = new Post({
    ...postObject,
    imageUrl:
      req.file.filename &&
      `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  console.log("post", post);
  post
    .save()
    .then((post) => res.status(201).json(post))
    .catch((error) => res.status(500).json(error));
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: { model: User, attributes: ["firstname", "lastname", "avatar"] },
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
    include: { model: User, attributes: ["firstname", "lastname", "avatar"] },
  })
    .then((post) => res.status(200).json({ post }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "post supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  const postObject = req.body;
  Post.update({ ...postObject }, { where: { id: req.params.id } })
    .then(res.status(200).json({ message: "post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
