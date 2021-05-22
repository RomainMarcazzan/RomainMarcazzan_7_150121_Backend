const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controlers/comment");

router.post("/", auth, commentCtrl.createComment);
router.get("/:postId", auth, commentCtrl.getComments);
module.exports = router;
