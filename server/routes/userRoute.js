const express = require("express");
const upload = require("../helper/multer")
const {
  getUserController,
  userSignUpController,
  userLoginController,
  addImageController,
} = require("../controller/userController");
const router = express.Router();


router.get("/get-user", getUserController);
router.post("/signup", userSignUpController);
router.post("/login", userLoginController);
router.post("/add-img",upload.single("image"), addImageController);

module.exports = router;
