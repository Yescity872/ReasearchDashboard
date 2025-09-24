import express from "express";
import {
  createShop,
  getShopsByCity,
  getShopById,
  updateShop,
  deleteShop,
} from "../controllers/shoppingController.js";

const router = express.Router();

router.post("/create", createShop);
router.get("/city/:cityId", getShopsByCity);
router.get("/:id", getShopById);
router.put("/:id", updateShop);
router.delete("/:id", deleteShop);

export default router;


