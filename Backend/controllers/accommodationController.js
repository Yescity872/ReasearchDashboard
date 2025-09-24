// import Accommodation from "../models/Accommodation.js";
// import { getCityId } from "../utils/getCityId.js";

// export const createAccommodation = async (req, res) => {
//     try {
//         const {
//             cityName,
//       hotels,
//       flagShip,
//       lat,
//       lon,
//       address,
//       locationLink,
//       category,
//       minPrice,
//       maxPrice,
//       roomTypes,
//       facilities,
//       image0,
//       image1,
//       image2,
//       images,
//       premium
//     } = req.body;

//     if (!cityName || !hotels) {
//       return res.status(400).json({ message: "City name and hotel name are required" });
//     }

//     const cityId = await getCityId(cityName);

//     const accommodation = new Accommodation({
//       cityId,
//       cityName,
//       hotels,
//       flagShip: flagShip !== undefined ? flagShip : true, // default true
//       lat,
//       lon,
//       address,
//       locationLink,
//       category,
//       minPrice,
//       maxPrice,
//       roomTypes,
//       facilities,
//       image0,
//       image1,
//       image2,
//       images,
//       premium: premium !== undefined ? premium : false, // default false
//     });

//     await accommodation.save();
//     res.status(201).json({ message: "Accommodation created successfully", accommodation });
//   } catch (error) {
//     console.error("Error creating accommodation:", error);
//     res.status(500).json({ message: "Server error" });
//   } 
// };

// export const getAllAccommodations = async (req, res) => {
//   try {
//     const accommodations = await Accommodation.find().sort({ cityName: 1, hotels: 1 });
//     return res.status(200).json(accommodations);
//   } catch (error) {
//     console.error("Error fetching accommodations:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getAccommodationsByCityId = async (req, res) => {
//   try {
//     const { cityId } = req.params;
//     const accommodations = await Accommodation.find({ cityId });

//     if (!accommodations || accommodations.length === 0) {
//       return res.status(404).json({ message: "No accommodations found for this city" });
//     }

//     return res.status(200).json(accommodations);
//   } catch (error) {
//     console.error("Error fetching accommodations:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

import Accommodation from "../models/Accommodation.js";
import { getCityId } from "../utils/getCityId.js";

// ➝ Add new accommodation
export const createAccommodation = async (req, res) => {
  try {
    const {
      cityName,
      hotels,
      flagship,
      lat,
      lon,
      address,
      locationLink,
      category,
      minPrice,
      maxPrice,
      roomTypes,
      facilities,
      image0,
      image1,
      image2,
      images,
      premium,
    } = req.body;

    // Get or create cityId
    const cityId = await getCityId(cityName);

    const newAccommodation = new Accommodation({
      cityId,
      cityName,
      hotels,
      flagship,
      lat,
      lon,
      address,
      locationLink,
      category,
      minPrice,
      maxPrice,
      roomTypes,
      facilities,
      image0,
      image1,
      image2,
      images: [image0, image1, image2].filter(Boolean),
      premium,
    });

    await newAccommodation.save();
    res.status(201).json(newAccommodation);
  } catch (error) {
    console.error("Error creating accommodation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➝ Get all accommodations for a city
export const getAccommodationsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const accommodations = await Accommodation.find({ cityId });

    if (!accommodations || accommodations.length === 0) {
      return res.status(404).json({ message: "No accommodations found" });
    }

    res.json(accommodations);
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➝ Get single accommodation by ID
export const getAccommodationById = async (req, res) => {
  try {
    const { id } = req.params;
    const accommodation = await Accommodation.findById(id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json(accommodation);
  } catch (error) {
    console.error("Error fetching accommodation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➝ Update accommodation
export const updateAccommodation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayload = { ...req.body };
    if (
      Object.prototype.hasOwnProperty.call(updatePayload, 'image0') ||
      Object.prototype.hasOwnProperty.call(updatePayload, 'image1') ||
      Object.prototype.hasOwnProperty.call(updatePayload, 'image2')
    ) {
      const { image0, image1, image2 } = updatePayload;
      updatePayload.images = [image0, image1, image2].filter(Boolean);
    }
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, updatePayload, { new: true });

    if (!updatedAccommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json(updatedAccommodation);
  } catch (error) {
    console.error("Error updating accommodation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➝ Delete accommodation
export const deleteAccommodation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAccommodation = await Accommodation.findByIdAndDelete(id);

    if (!deletedAccommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json({ message: "Accommodation deleted successfully" });
  } catch (error) {
    console.error("Error deleting accommodation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const checkAccommodation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const accommodation = await Accommodation.findById(id);
    console.log('Found accommodation:', accommodation);
    
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }
    
    res.json(accommodation);
  } catch (error) {
    console.error("Error finding accommodation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};