const express = require("express");
const {
  adminLoginController,
  getAllUsersController,
  deleteUserController,
} = require("../controller/adminController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/login", adminLoginController);
router.get("/get-users", requireSignIn, isAdmin, getAllUsersController);
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserController);

module.exports = router;
