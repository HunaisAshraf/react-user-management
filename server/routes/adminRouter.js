const express = require("express");
const { adminLoginController } = require("../controller/adminController");
const router = express.Router();


router.post("/login",adminLoginController)

module.exports = router;