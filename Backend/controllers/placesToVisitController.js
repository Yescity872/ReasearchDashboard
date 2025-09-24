import PlacesToVisit from "../models/PlacesToVisit.js";
import { getCityId } from "../utils/getCityId.js";

export const createPlaceToVisit = async (req, res) => {
  try {
    const {
      cityName,
      places,
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

    const doc = new PlacesToVisit({
      cityId,
      cityName,
      places,
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
    console.error("Error creating place to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPlacesToVisitByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const data = await PlacesToVisit.find({ cityId });
    res.json(data);
  } catch (error) {
    console.error("Error fetching places to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPlaceToVisitById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await PlacesToVisit.findById(id);
    if (!doc) return res.status(404).json({ message: "Place to visit not found" });
    res.json(doc);
  } catch (error) {
    console.error("Error fetching place to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePlaceToVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await PlacesToVisit.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Place to visit not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating place to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePlaceToVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PlacesToVisit.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Place to visit not found" });
    res.json({ message: "Place to visit deleted successfully" });
  } catch (error) {
    console.error("Error deleting place to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};


