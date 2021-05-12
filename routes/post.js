const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const postCtrl = require("../controlers/post");

router.post("/", auth, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
module.exports = router;
