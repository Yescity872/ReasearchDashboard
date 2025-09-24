import express from "express";
import {
  createLocalTransport,
  getLocalTransportByCity,
  getLocalTransportById,
  updateLocalTransport,
  deleteLocalTransport,
} from "../controllers/localTransportController.js";

const router = express.Router();

router.post("/create", createLocalTransport);
router.get("/city/:cityId", getLocalTransportByCity);
router.get("/:id", getLocalTransportById);
router.put("/:id", updateLocalTransport);
router.delete("/:id", deleteLocalTransport);

export default router;


