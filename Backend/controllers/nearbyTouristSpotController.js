import NearbyTouristSpot from "../models/NearbyTouristSpot.js";
import { getCityId } from "../utils/getCityId.js";

export const createNearbyTouristSpot = async (req, res) => {
  try {
    const {
      cityName,
      places,
      distance,
      category,
      lat,
      lon,
      address,
      locationLink,
      openDay,
      openTime,
      establishYear,
      fee,
      description,
      essential,
      story,
      image0,
      image1,
      image2,
      videos,
      premium,
    } = req.body;

    if (!cityName || !places) {
      return res.status(400).json({ message: "cityName and places are required" });
    }

    const cityId = await getCityId(cityName);

    const doc = new NearbyTouristSpot({
      cityId,
      cityName,
      places,
      distance,
      category,
      lat,
      lon,
      address,
      locationLink,
      openDay,
      openTime,
      establishYear,
      fee,
      description,
      essential,
      story,
      images: [image0, image1, image2].filter(Boolean),
      videos,
      premium,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.error("Error creating nearby tourist spot:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNearbyTouristSpotsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const data = await NearbyTouristSpot.find({ cityId });
    res.json(data);
  } catch (error) {
    console.error("Error fetching nearby tourist spots:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNearbyTouristSpotById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await NearbyTouristSpot.findById(id);
    if (!doc) return res.status(404).json({ message: "Nearby tourist spot not found" });
    res.json(doc);
  } catch (error) {
    console.error("Error fetching nearby tourist spot:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNearbyTouristSpot = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await NearbyTouristSpot.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Nearby tourist spot not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating nearby tourist spot:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNearbyTouristSpot = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await NearbyTouristSpot.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Nearby tourist spot not found" });
    res.json({ message: "Nearby tourist spot deleted successfully" });
  } catch (error) {
    console.error("Error deleting nearby tourist spot:", error);
    res.status(500).json({ message: "Server error" });
  }
};


