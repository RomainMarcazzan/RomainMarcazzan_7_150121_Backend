const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const reportCtrl = require("../controlers/report");

router.post("/", auth, reportCtrl.createReport);
router.get("/", auth, reportCtrl.getAllReports);
router.get("/users", auth, reportCtrl.getAllUsers);
router.delete("/users/:id", auth, reportCtrl.removeProfile);
router.put("/users/:id", auth, reportCtrl.blockProfile);
router.get("/:id", auth, reportCtrl.getOneReport);
router.delete("/:id", auth, reportCtrl.removeReport);

module.exports = router;
