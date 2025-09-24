import express from "express";
import {
  createHiddenGem,
  getHiddenGemsByCity,
  getHiddenGemById,
  updateHiddenGem,
  deleteHiddenGem
} from "../controllers/hiddenGemsController.js";

const router = express.Router();

router.post("/create", createHiddenGem);
router.get("/city/:cityId", getHiddenGemsByCity);
router.get("/:id", getHiddenGemById);
router.put("/:id", updateHiddenGem);
router.delete("/:id", deleteHiddenGem);

export default router;
