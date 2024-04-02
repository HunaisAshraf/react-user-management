const express = require("express");
const upload = require("../helpers/multer");
const {
  getUserController,
  userLoginController,
  addImageController,
  getImgController,
  addUserController,
} = require("../controller/userController");
const { requireSignIn } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/get-user", getUserController);
router.post("/signup", addUserController);
router.post("/login", userLoginController);
router.post(
  "/add-img",
  requireSignIn,
  upload.single("image"),
  addImageController
);
router.get("/get-img", requireSignIn, getImgController);

module.exports = router;
