const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeCtrl = require("../controlers/like");

router.post("/", auth, likeCtrl.createLike);
router.get("/:id", auth, likeCtrl.getOneLike);
module.exports = router;
