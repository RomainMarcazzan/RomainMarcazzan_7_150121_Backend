const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controlers/comment");

router.post("/", auth, commentCtrl.createComment);
router.get("/:postId", auth, commentCtrl.getComments);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.put("/:id", auth, commentCtrl.modifyComment);
module.exports = router;
