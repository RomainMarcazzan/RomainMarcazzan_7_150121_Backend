const express = require("express");
const router = express.Router();
const profileCtrl = require("../controlers/profile");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config-avatar");

router.put("/:id", auth, multer, profileCtrl.modifyUser);
router.delete("/:id", auth, profileCtrl.removeProfile);
module.exports = router;
