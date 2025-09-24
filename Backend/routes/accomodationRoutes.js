import express from "express";
import {
  createAccommodation,
  getAccommodationsByCity,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
  checkAccommodation
} from "../controllers/accommodationController.js";

const router = express.Router();

router.post("/create", createAccommodation);
router.get("/city/:cityId", getAccommodationsByCity);
router.get("/:id", getAccommodationById);
router.put("/:id", updateAccommodation);
router.delete("/:id", deleteAccommodation);
router.get("/check", checkAccommodation);

export default router;
