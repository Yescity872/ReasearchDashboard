import express from "express";
import {
  createCityInfo,
  getCityInfoByCity,
  getCityInfoById,
  updateCityInfo,
  deleteCityInfo,
} from "../controllers/generalCityInfoController.js";

const router = express.Router();

router.post("/create", createCityInfo);
router.get("/city/:cityId", getCityInfoByCity);
router.get("/:id", getCityInfoById);
router.put("/:id", updateCityInfo);
router.delete("/:id", deleteCityInfo);

export default router;
