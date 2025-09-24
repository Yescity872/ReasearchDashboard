import Food from "../models/Food.js";
import { getCityId } from "../utils/getCityId.js";

export const addFood = async (req, res) => {
  try {
    const { cityName, ...foodData } = req.body;

    if (!cityName || !foodData.foodPlace) {
      return res.status(400).json({ message: "cityName and foodPlace are required" });
    }

    // get or create cityId
    const cityId = await getCityId(cityName);

    const newFood = new Food({
      cityId,
      cityName,
      ...foodData,
      images: [foodData.image0, foodData.image1, foodData.image2].filter(Boolean),
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all Food entries for a city
export const getFoodByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const foods = await Food.find({ cityId });
    res.json(foods);
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a single Food entry by ID
export const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ message: "Food entry not found" });
    }

    res.json(food);
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Food entry
export const updateFood = async (req, res) => {
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
    const updatedFood = await Food.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res.status(404).json({ message: "Food entry not found" });
    }

    res.json(updatedFood);
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Food entry
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food entry not found" });
    }

    res.json({ message: "Food entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ message: "Server error" });
  }
};