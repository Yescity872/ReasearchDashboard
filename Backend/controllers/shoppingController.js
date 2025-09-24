import Shopping from "../models/Shopping.js";
import { getCityId } from "../utils/getCityId.js";

export const createShop = async (req, res) => {
  try {
    const {
      cityName,
      shops,
      flagship,
      lat,
      lon,
      address,
      locationLink,
      famousFor,
      priceRange,
      openDay,
      openTime,
      phone,
      website,
      image0,
      image1,
      image2,
      premium,
    } = req.body;

    if (!cityName || !shops) {
      return res.status(400).json({ message: "cityName and shops are required" });
    }

    const cityId = await getCityId(cityName);

    const doc = new Shopping({
      cityId,
      cityName,
      shops,
      flagship,
      lat,
      lon,
      address,
      locationLink,
      famousFor,
      priceRange,
      openDay,
      openTime,
      phone,
      website,
      image0,
      image1,
      image2,
      images: [image0, image1, image2].filter(Boolean),
      premium,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getShopsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const data = await Shopping.find({ cityId });
    res.json(data);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Shopping.findById(id);
    if (!doc) return res.status(404).json({ message: "Shop not found" });
    res.json(doc);
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };
    if (
      Object.prototype.hasOwnProperty.call(payload, 'image0') ||
      Object.prototype.hasOwnProperty.call(payload, 'image1') ||
      Object.prototype.hasOwnProperty.call(payload, 'image2')
    ) {
      payload.images = [payload.image0, payload.image1, payload.image2].filter(Boolean);
    }
    const updated = await Shopping.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: "Shop not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteShop = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Shopping.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Shop not found" });
    res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};


