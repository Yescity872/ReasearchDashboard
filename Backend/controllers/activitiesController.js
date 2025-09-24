import Activities from "../models/Activities.js";
import {getCityId} from "../utils/getCityId.js";
import mongoose from "mongoose";

export const createActivity = async (req, res) => {
  try {
    const {
      cityName,
      topActivities,
      bestPlaces,
      description,
      essentials,
      fee,
      images,
      videos,
      premium,
    } = req.body;

    // Get or create cityId
    const cityId = await getCityId(cityName);

    const newActivity = new Activities({
      cityId,
      cityName,
      topActivities,
      bestPlaces,
      description,
      essentials,
      fee,
      images,
      videos,
      premium,
    });

    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getActivitiesByCity = async (req, res) => {
  try {
    const  cityId  = req.params.cityId;

    // Validate cityId parameter
    if (!cityId || !mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ 
        message: "City ID is required and must be a valid ObjectId" 
      });
    }

    // Validate if cityId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ 
        message: "Invalid City ID format" 
      });
    }

    const activities = await Activities.find({ cityId });

    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: "No activities found for this city" });
    }

    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activities.findById(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedActivity = await Activities.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activities.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

