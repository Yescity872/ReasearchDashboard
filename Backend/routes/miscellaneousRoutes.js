import express from "express";
import {
  createMiscellaneous,
  getMiscellaneousByCity,
  getMiscellaneousById,
  updateMiscellaneous,
  deleteMiscellaneous,
} from "../controllers/miscellaneousController.js";

const router = express.Router();

router.post("/create", createMiscellaneous);
router.get("/city/:cityId", getMiscellaneousByCity);
router.get("/:id", getMiscellaneousById);
router.put("/:id", updateMiscellaneous);
router.delete("/:id", deleteMiscellaneous);

export default router;


