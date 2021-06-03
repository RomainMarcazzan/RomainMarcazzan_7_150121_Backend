const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();
const postCtrl = require("../controlers/post");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.modifyPost);
module.exports = router;
