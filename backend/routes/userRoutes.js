import express from "express";
const router = express.Router();
import {
  authuser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getById,
  updateUser,
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(authuser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getById)
  .put(protect, admin, updateUser);
export default router;
