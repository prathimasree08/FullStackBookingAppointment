const express = require("express");
const router = express.Router();
const path = require("path");

const UserController = require("../controllers/mainController.js");

router.get("/",UserController.getUserDetails);
router.post("/",UserController.AddUserDetails);
router.delete("/:id",UserController.deleteUserDetails);
router.post("/",UserController.editUserDetails);

module.exports = router;