const express = require("express");
const {
  getUserController,
  userSignUpController,
  userLoginController,
} = require("../controller/userController");
const router = express.Router();

router.get("/get-user", getUserController);
router.post("/signup", userSignUpController);
router.post("/login", userLoginController);

module.exports = router;
