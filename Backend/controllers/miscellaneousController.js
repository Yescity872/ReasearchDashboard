import Miscellaneous from "../models/Miscellaneous.js";
import { getCityId } from "../utils/getCityId.js";

export const createMiscellaneous = async (req, res) => {
  try {
    const { cityName, engagement, reviews, ...rest } = req.body;

    if (!cityName) {
      return res.status(400).json({ message: "cityName is required" });
    }

    const cityId = await getCityId(cityName);

    const doc = new Miscellaneous({
      cityId,
      cityName,
      engagement,
      reviews,
      ...rest,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.error("Error creating miscellaneous:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMiscellaneousByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const data = await Miscellaneous.find({ cityId });
    res.json(data);
  } catch (error) {
    console.error("Error fetching miscellaneous:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMiscellaneousById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Miscellaneous.findById(id);
    if (!doc) return res.status(404).json({ message: "Miscellaneous not found" });
    res.json(doc);
  } catch (error) {
    console.error("Error fetching miscellaneous by id:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMiscellaneous = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Miscellaneous.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Miscellaneous not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating miscellaneous:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteMiscellaneous = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Miscellaneous.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Miscellaneous not found" });
    res.json({ message: "Miscellaneous deleted successfully" });
  } catch (error) {
    console.error("Error deleting miscellaneous:", error);
    res.status(500).json({ message: "Server error" });
  }
};


