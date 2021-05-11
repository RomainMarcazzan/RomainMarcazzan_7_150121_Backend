const express = require("express");
const router = express.Router();
const postCtrl = require("../controlers/post");

router.post("/posts", postCtrl.createPost);
module.exports = router;
