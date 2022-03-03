import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProduct).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
