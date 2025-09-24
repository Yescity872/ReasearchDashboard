import express from "express";
import {
  createNearbyTouristSpot,
  getNearbyTouristSpotsByCity,
  getNearbyTouristSpotById,
  updateNearbyTouristSpot,
  deleteNearbyTouristSpot,
} from "../controllers/nearbyTouristSpotController.js";

const router = express.Router();

router.post("/create", createNearbyTouristSpot);
router.get("/city/:cityId", getNearbyTouristSpotsByCity);
router.get("/:id", getNearbyTouristSpotById);
router.put("/:id", updateNearbyTouristSpot);
router.delete("/:id", deleteNearbyTouristSpot);

export default router;


