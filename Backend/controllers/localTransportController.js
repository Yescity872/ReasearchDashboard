import LocalTransport from "../models/LocalTransport.js";
import { getCityId } from "../utils/getCityId.js";

// ➝ Create new local transport entry
export const createLocalTransport = async (req, res) => {
  try {
    const { cityName, from, to, autoPrice, cabPrice, bikePrice, premium } = req.body;

    if (!cityName || !from || !to) {
      return res.status(400).json({ message: "cityName, from and to are required" });
    }

    const cityId = await getCityId(cityName);

    const entry = new LocalTransport({
      cityId,
      cityName,
      from,
      to,
      autoPrice,
      cabPrice,
      bikePrice,
      premium,
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error("Error creating local transport:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ➝ Get all local transport entries for a city
export const getLocalTransportByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const data = await LocalTransport.find({ cityId });
    res.json(data);
  } catch (error) {
    console.error("Error fetching local transport:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ➝ Get a single entry by ID
export const getLocalTransportById = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await LocalTransport.findById(id);
    if (!entry) return res.status(404).json({ message: "Local transport entry not found" });
    res.json(entry);
  } catch (error) {
    console.error("Error fetching local transport by id:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ➝ Update an entry
export const updateLocalTransport = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await LocalTransport.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Local transport entry not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating local transport:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ➝ Delete an entry
export const deleteLocalTransport = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LocalTransport.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Local transport entry not found" });
    res.json({ message: "Local transport entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting local transport:", error);
    res.status(500).json({ message: "Server error" });
  }
};


