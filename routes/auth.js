const { registeration, login } = require("../controllers/auth");

const express = require("express");
const router = express.Router();

router.route("/register").post(registeration);
router.route("/login").post(login)


module.exports = router;
