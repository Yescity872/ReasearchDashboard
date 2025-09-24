import express from "express";
import {
  createPlaceToVisit,
  getPlacesToVisitByCity,
  getPlaceToVisitById,
  updatePlaceToVisit,
  deletePlaceToVisit,
} from "../controllers/placesToVisitController.js";

const router = express.Router();

router.post("/create", createPlaceToVisit);
router.get("/city/:cityId", getPlacesToVisitByCity);
router.get("/:id", getPlaceToVisitById);
router.put("/:id", updatePlaceToVisit);
router.delete("/:id", deletePlaceToVisit);

export default router;


