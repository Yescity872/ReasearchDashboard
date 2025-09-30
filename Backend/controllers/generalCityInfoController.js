import GeneralCityInfo from "../models/GeneralCityInfo.js";
import { getCityId } from "../utils/getCityId.js";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ➝ Add general city info
export const createCityInfo = async (req, res) => {
  try {
    const {
      cityName,
      stateOrUT,
      alternateNames,
      languagesSpoken,
      climateInfo,
      bestTimeToVisit,
      cityHistory,
      coverImage,
      premium,
    } = req.body;

    // Get or create cityId
    const cityId = await getCityId(cityName);

    const newCityInfo = new GeneralCityInfo({
      cityId,
      cityName,
      stateOrUT,
      alternateNames,
      languagesSpoken,
      climateInfo,
      bestTimeToVisit,
      cityHistory,
      coverImage,
      premium,
    });

    await newCityInfo.save();
    res.status(201).json(newCityInfo);
  } catch (error) {
    console.error("Error creating city info:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➝ Get general info of a city
export const getCityInfoByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const info = await GeneralCityInfo.find({ cityId });

    if (!info || info.length === 0) {
      return res.status(404).json({ message: "No city info found" });
    }

    res.json(info);
  } catch (error) {
    console.error("Error fetching city info:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➝ Get single city info by ID
export const getCityInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await GeneralCityInfo.findById(id);

    if (!info) {
      return res.status(404).json({ message: "City info not found" });
    }

    res.json(info);
  } catch (error) {
    console.error("Error fetching city info:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➝ Update city info
export const updateCityInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInfo = await GeneralCityInfo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedInfo) {
      return res.status(404).json({ message: "City info not found" });
    }

    res.json(updatedInfo);
  } catch (error) {
    console.error("Error updating city info:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➝ Delete city info
export const deleteCityInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInfo = await GeneralCityInfo.findByIdAndDelete(id);

    if (!deletedInfo) {
      return res.status(404).json({ message: "City info not found" });
    }

    res.json({ message: "City info deleted successfully" });
  } catch (error) {
    console.error("Error deleting city info:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
