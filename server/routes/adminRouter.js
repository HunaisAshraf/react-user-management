const express = require("express");
const {
  adminLoginController,
  getAllUsersController,
  deleteUserController,
  getUserDetailsController,
  editUserDetailsController,
} = require("../controller/adminController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  addUserController,
  getUserController,
} = require("../controller/userController");
const router = express.Router();

router.post("/login", adminLoginController);
router.get("/get-users", requireSignIn, isAdmin, getAllUsersController);
router.post("/add-user", requireSignIn, isAdmin, addUserController);
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserController);
router.get(
  "/user-details/:id",
  requireSignIn,
  isAdmin,
  getUserDetailsController
);
router.put("/edit-user/:id", requireSignIn, isAdmin, editUserDetailsController);

module.exports = router;
