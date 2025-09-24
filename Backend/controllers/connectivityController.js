import Connectivity from "../models/Connectivity.js";
import { getCityId } from "../utils/getCityId.js";

// ➝ Create new connectivity info
export const createConnectivity = async (req, res) => {
  try {
    const { cityName, nearestAirportStationBusStand, distance, lat, lon, locationLink, majorFlightsTrainsBuses, premium } = req.body;

    if (!cityName || !nearestAirportStationBusStand) {
      return res.status(400).json({ message: "cityName and nearestAirportStationBusStand are required" });
    }

    // Fetch or create cityId
    const cityId = await getCityId(cityName);

    const newConnectivity = new Connectivity({
      cityId,
      cityName,
      nearestAirportStationBusStand,
      distance,
      lat,
      lon,
      locationLink,
      majorFlightsTrainsBuses,
      premium,
    });

    await newConnectivity.save();

    res.status(201).json(newConnectivity);
  } catch (error) {
    console.error("Error creating connectivity info:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ➝ Get all connectivity records for a city
export const getConnectivityByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    const data = await Connectivity.find({ cityId });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching connectivity info:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ➝ Update connectivity info
export const updateConnectivity = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Connectivity.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Connectivity info not found" });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating connectivity info:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ➝ Delete connectivity info
export const deleteConnectivity = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Connectivity.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Connectivity info not found" });

    res.status(200).json({ message: "Connectivity info deleted successfully" });
  } catch (error) {
    console.error("Error deleting connectivity info:", error);
    res.status(500).json({ message: "Server error" });
  }
};