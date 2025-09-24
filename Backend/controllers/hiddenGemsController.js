import HiddenGem from "../models/HiddenGems.js";
import { getCityId } from "../utils/getCityId.js";

export const createHiddenGem = async (req, res) => {
  try {
    const { cityName, ...hiddenGemData } = req.body;

    if (!cityName || !hiddenGemData.hiddenGem) {
      return res.status(400).json({ message: "cityName and hiddenGem are required" });
    }

    // get or create cityId
    const cityId = await getCityId(cityName);

    // Build images array from image0, image1, image2 only
    hiddenGemData.images = [hiddenGemData.image0, hiddenGemData.image1, hiddenGemData.image2].filter(Boolean);

    const newHiddenGem = new HiddenGem({
      cityId,
      cityName,
      ...hiddenGemData,
    });

    await newHiddenGem.save();
    res.status(201).json(newHiddenGem);
  } catch (error) {
    console.error("Error adding hidden gem:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all HiddenGem entries for a city
export const getHiddenGemsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const hiddenGems = await HiddenGem.find({ cityId });
    res.json(hiddenGems);
  } catch (error) {
    console.error("Error fetching hidden gems data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a single HiddenGem entry by ID
export const getHiddenGemById = async (req, res) => {
  try {
    const { id } = req.params;
    const hiddenGem = await HiddenGem.findById(id);

    if (!hiddenGem) {
      return res.status(404).json({ message: "HiddenGem entry not found" });
    }

    res.json(hiddenGem);
  } catch (error) {
    console.error("Error fetching hidden gem by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update HiddenGem entry
export const updateHiddenGem = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Rebuild images from image0, image1, image2 if any of them present
    if (
      Object.prototype.hasOwnProperty.call(req.body, 'image0') ||
      Object.prototype.hasOwnProperty.call(req.body, 'image1') ||
      Object.prototype.hasOwnProperty.call(req.body, 'image2')
    ) {
      req.body.images = [req.body.image0, req.body.image1, req.body.image2].filter(Boolean);
    }

    const updatedHiddenGem = await HiddenGem.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedHiddenGem) {
      return res.status(404).json({ message: "HiddenGem entry not found" });
    }

    res.json(updatedHiddenGem);
  } catch (error) {
    console.error("Error updating hidden gem:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete HiddenGem entry
export const deleteHiddenGem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHiddenGem = await HiddenGem.findByIdAndDelete(id);

    if (!deletedHiddenGem) {
      return res.status(404).json({ message: "HiddenGem entry not found" });
    }

    res.json({ message: "HiddenGem entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting hidden gem:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all HiddenGems (optional - if you need this functionality)
export const getAllHiddenGems = async (req, res) => {
  try {
    const hiddenGems = await HiddenGem.find();
    res.json(hiddenGems);
  } catch (error) {
    console.error("Error fetching all hidden gems:", error);
    res.status(500).json({ message: "Server error" });
  }
};