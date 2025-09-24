import express from "express";
import {
    createActivity,
    getActivitiesByCity,
    getActivityById,
    updateActivity,
    deleteActivity
} from "../controllers/activitiesController.js";

const router = express.Router();

router.post("/create", createActivity);
router.get("/city/:cityId", getActivitiesByCity);
router.get("/:id", getActivityById);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;