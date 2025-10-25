// import GeneralCityInfo from "../models/GeneralCityInfo.js";
// import { getCityId } from "../utils/getCityId.js";
// import cloudinary from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // ➝ Add general city info
// export const createCityInfo = async (req, res) => {
//   try {
//     const {
//       cityName,
//       stateOrUT,
//       alternateNames,
//       languagesSpoken,
//       climateInfo,
//       bestTimeToVisit,
//       cityHistory,
//       coverImage,
//       premium,
//     } = req.body;

//     // Get or create cityId
//     const cityId = await getCityId(cityName);

//     const newCityInfo = new GeneralCityInfo({
//       cityId,
//       cityName,
//       stateOrUT,
//       alternateNames,
//       languagesSpoken,
//       climateInfo,
//       bestTimeToVisit,
//       cityHistory,
//       coverImage,
//       premium,
//     });

//     await newCityInfo.save();
//     res.status(201).json(newCityInfo);
//   } catch (error) {
//     console.error("Error creating city info:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ➝ Get general info of a city
// export const getCityInfoByCity = async (req, res) => {
//   try {
//     const { cityId } = req.params;
//     const info = await GeneralCityInfo.find({ cityId });

//     if (!info || info.length === 0) {
//       return res.status(404).json({ message: "No city info found" });
//     }

//     res.json(info);
//   } catch (error) {
//     console.error("Error fetching city info:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ➝ Get single city info by ID
// export const getCityInfoById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const info = await GeneralCityInfo.findById(id);

//     if (!info) {
//       return res.status(404).json({ message: "City info not found" });
//     }

//     res.json(info);
//   } catch (error) {
//     console.error("Error fetching city info:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ➝ Update city info
// export const updateCityInfo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedInfo = await GeneralCityInfo.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     if (!updatedInfo) {
//       return res.status(404).json({ message: "City info not found" });
//     }

//     res.json(updatedInfo);
//   } catch (error) {
//     console.error("Error updating city info:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ➝ Delete city info
// export const deleteCityInfo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedInfo = await GeneralCityInfo.findByIdAndDelete(id);

//     if (!deletedInfo) {
//       return res.status(404).json({ message: "City info not found" });
//     }

//     res.json({ message: "City info deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting city info:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

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

// Helper function to check if it's a Cloudinary URL
const isCloudinaryUrl = (url) => {
  return url && typeof url === 'string' && url.includes('res.cloudinary.com');
};

// Helper function to check if it's a base64 image (needs upload)
const isBase64Image = (str) => {
  return str && typeof str === 'string' && str.startsWith('data:image/');
};

// Helper function to check if it's a regular URL (not base64, not Cloudinary)
const isRegularUrl = (str) => {
  return str && typeof str === 'string' && 
         str.startsWith('http') && 
         !isBase64Image(str) && 
         !isCloudinaryUrl(str);
};

// Helper function to upload image to Cloudinary
const uploadToCloudinary = async (image, folder = 'city-info-images') => {
  if (!image || image.trim() === "") return "";

  try {
    const uploadResult = await cloudinary.v2.uploader.upload(image, {
      folder: folder,
      transformation: [
        { width: 1200, height: 800, crop: 'fill' },
        { quality: 'auto' },
        { format: 'webp' }
      ]
    });
    return uploadResult.secure_url;
  } catch (uploadError) {
    console.error(`Cloudinary upload error for ${folder}:`, uploadError);
    // Return original image if upload fails
    return image;
  }
};

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

    // Handle coverImage upload to Cloudinary
    let cloudinaryCoverImage = coverImage;
    if (coverImage && coverImage.trim() !== "") {
      cloudinaryCoverImage = await uploadToCloudinary(coverImage, 'city-info-cover');
    }

    const newCityInfo = new GeneralCityInfo({
      cityId,
      cityName,
      stateOrUT,
      alternateNames,
      languagesSpoken,
      climateInfo,
      bestTimeToVisit,
      cityHistory,
      coverImage: cloudinaryCoverImage,
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
    const payload = { ...req.body };

    // Get the existing city info data first
    const existingCityInfo = await GeneralCityInfo.findById(id);
    if (!existingCityInfo) return res.status(404).json({ message: "City info not found" });

    // Handle coverImage update
    if (payload.coverImage !== undefined) {
      if (payload.coverImage && payload.coverImage.trim() !== "") {
        // Only upload if it's a new image (base64), not if it's already a Cloudinary URL
        if (isBase64Image(payload.coverImage)) {
          try {
            console.log("Uploading coverImage to Cloudinary...");
            const uploadResult = await cloudinary.v2.uploader.upload(payload.coverImage, {
              folder: 'city-info-cover',
              transformation: [
                { width: 1200, height: 800, crop: 'fill' },
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for coverImage:", uploadResult.secure_url);
            payload.coverImage = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for coverImage:", uploadError);
            console.error("Upload error details:", uploadError.message);
            // Don't save base64 to DB - either use existing image or clear it
            payload.coverImage = existingCityInfo.coverImage || "";
          }
        } else if (isCloudinaryUrl(payload.coverImage)) {
          // It's already a Cloudinary URL, keep it as is
          payload.coverImage = payload.coverImage;
        } else if (isRegularUrl(payload.coverImage)) {
          // It's a regular URL, upload it to Cloudinary
          try {
            console.log("Uploading regular URL coverImage to Cloudinary:", payload.coverImage);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.coverImage, {
              folder: 'city-info-cover',
              transformation: [
                { width: 1200, height: 800, crop: 'fill' },
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for regular URL coverImage:", uploadResult.secure_url);
            payload.coverImage = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for regular URL coverImage:", uploadError);
            // If upload fails, keep the original regular URL
            payload.coverImage = payload.coverImage;
          }
        } else {
          // Unknown type, keep as is
          payload.coverImage = payload.coverImage;
        }
      } else {
        payload.coverImage = ""; // Clear the image
      }
    }

    const updatedInfo = await GeneralCityInfo.findByIdAndUpdate(id, payload, {
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

// ➝ Check city info (similar to checkAccommodation)
export const checkCityInfo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const cityInfo = await GeneralCityInfo.findById(id);
    console.log('Found city info:', cityInfo);
    
    if (!cityInfo) {
      return res.status(404).json({ message: "City info not found" });
    }
    
    res.json(cityInfo);
  } catch (error) {
    console.error("Error finding city info:", error);
    res.status(500).json({ message: "Server Error" });
  }
};