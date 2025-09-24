// routes/connectivityRoutes.js
import express from "express";
import {
  createConnectivity,
  getConnectivityByCity,
  updateConnectivity,
  deleteConnectivity,
} from "../controllers/connectivityController.js";

const router = express.Router();

// ➝ POST new connectivity info
router.post("/create", createConnectivity);

// ➝ GET all connectivity info for a city by cityId
router.get("/city/:cityId", getConnectivityByCity);

// ➝ PUT update connectivity info
router.put("/:id", updateConnectivity);

// ➝ DELETE connectivity info
router.delete("/:id", deleteConnectivity);

export default router;
