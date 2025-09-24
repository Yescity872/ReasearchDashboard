import express from "express";
import {
  addFood,
  getFoodByCity,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

const router = express.Router();

// POST → Add new food entry
router.post("/create", addFood);
router.get("/city/:cityId", getFoodByCity);
router.get("/:id", getFoodById);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
