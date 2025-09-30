// import Activities from "../models/Activities.js";
// import {getCityId} from "../utils/getCityId.js";
// import mongoose from "mongoose";
// import cloudinary from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export const createActivity = async (req, res) => {
//   try {
//     const {
//       cityName,
//       topActivities,
//       bestPlaces,
//       description,
//       essentials,
//       fee,
//       images,
//       videos,
//       premium,
//     } = req.body;

//     // Get or create cityId
//     const cityId = await getCityId(cityName);

//     const newActivity = new Activities({
//       cityId,
//       cityName,
//       topActivities,
//       bestPlaces,
//       description,
//       essentials,
//       fee,
//       images,
//       videos,
//       premium,
//     });

//     await newActivity.save();
//     res.status(201).json(newActivity);
//   } catch (error) {
//     console.error("Error creating activity:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const getActivitiesByCity = async (req, res) => {
//   try {
//     const  cityId  = req.params.cityId;

//     // Validate cityId parameter
//     if (!cityId || !mongoose.Types.ObjectId.isValid(cityId)) {
//       return res.status(400).json({ 
//         message: "City ID is required and must be a valid ObjectId" 
//       });
//     }

//     // Validate if cityId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(cityId)) {
//       return res.status(400).json({ 
//         message: "Invalid City ID format" 
//       });
//     }

//     const activities = await Activities.find({ cityId });

//     if (!activities || activities.length === 0) {
//       return res.status(404).json({ message: "No activities found for this city" });
//     }

//     res.json(activities);
//   } catch (error) {
//     console.error("Error fetching activities:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const getActivityById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const activity = await Activities.findById(id);

//     if (!activity) {
//       return res.status(404).json({ message: "Activity not found" });
//     }

//     res.json(activity);
//   } catch (error) {
//     console.error("Error fetching activity:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const updateActivity = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedActivity = await Activities.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     if (!updatedActivity) {
//       return res.status(404).json({ message: "Activity not found" });
//     }

//     res.json(updatedActivity);
//   } catch (error) {
//     console.error("Error updating activity:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const deleteActivity = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedActivity = await Activities.findByIdAndDelete(id);

//     if (!deletedActivity) {
//       return res.status(404).json({ message: "Activity not found" });
//     }

//     res.json({ message: "Activity deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting activity:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

import Activities from "../models/Activities.js";
import { getCityId } from "../utils/getCityId.js";
import mongoose from "mongoose";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to check if it's a base64 image
const isBase64Image = (str) => {
  return str && typeof str === 'string' && str.startsWith('data:image/');
};

// Helper function to check if it's a Cloudinary URL
const isCloudinaryUrl = (url) => {
  return url && typeof url === 'string' && url.includes('res.cloudinary.com');
};

// Helper function to check if it's a regular URL
const isRegularUrl = (str) => {
  return str && typeof str === 'string' && 
         str.startsWith('http') && 
         !isBase64Image(str) && 
         !isCloudinaryUrl(str);
};

// Helper function to upload image to Cloudinary with proper base64 handling
const uploadToCloudinary = async (image) => {
  if (!image || typeof image !== 'string') return image;
  
  try {
    // For base64 images, Cloudinary can handle them directly
    if (isBase64Image(image)) {
      console.log("Uploading base64 image to Cloudinary...");
      const uploadResult = await cloudinary.v2.uploader.upload(image, {
        folder: 'activities-images',
        transformation: [
          { width: 800, height: 600, crop: 'fill' },
          { quality: 'auto' },
          { format: 'webp' }
        ]
      });
      console.log("Cloudinary upload successful:", uploadResult.secure_url);
      return uploadResult.secure_url;
    }
    
    // For regular URLs, upload to Cloudinary
    if (isRegularUrl(image)) {
      console.log("Uploading regular URL to Cloudinary:", image);
      const uploadResult = await cloudinary.v2.uploader.upload(image, {
        folder: 'activities-images',
        transformation: [
          { width: 800, height: 600, crop: 'fill' },
          { quality: 'auto' },
          { format: 'webp' }
        ]
      });
      console.log("Cloudinary upload successful:", uploadResult.secure_url);
      return uploadResult.secure_url;
    }
    
    // For Cloudinary URLs, keep as is
    if (isCloudinaryUrl(image)) {
      return image;
    }
    
    // For any other case, return the original
    return image;
  } catch (uploadError) {
    console.error("Cloudinary upload error:", uploadError.message);
    return image; // Return original if upload fails
  }
};

export const createActivity = async (req, res) => {
  try {
    const {
      cityName,
      topActivities,
      bestPlaces,
      description,
      essentials,
      fee,
      image0, // Receive from frontend but don't store in DB
      videos,
      premium,
    } = req.body;

    if (!cityName || !topActivities) {
      return res.status(400).json({ message: "cityName and topActivities are required" });
    }

    // Get or create cityId
    const cityId = await getCityId(cityName);

    // Handle image0 upload to Cloudinary
    let processedImage = "";
    if (image0 && image0.trim() !== "") {
      processedImage = await uploadToCloudinary(image0);
    }

    // Handle videos - filter empty values
    const processedVideos = Array.isArray(videos) 
      ? videos.filter(video => video && typeof video === 'string' && video.trim() !== "")
      : [];

    // Handle essentials - convert string to array if needed
    let processedEssentials = [];
    if (typeof essentials === 'string') {
      processedEssentials = essentials.split(',').map(item => item.trim()).filter(item => item);
    } else if (Array.isArray(essentials)) {
      processedEssentials = essentials;
    }

    // Build images array from single image0 (only store images array, not image0)
    const processedImages = processedImage ? [processedImage] : [];

    const newActivity = new Activities({
      cityId,
      cityName,
      topActivities,
      bestPlaces,
      description,
      essentials: processedEssentials,
      fee,
      images: processedImages, // Only store images array, not image0 field
      videos: processedVideos,
      premium: premium ? "PREMIUM" : "FREE",
    });

    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getActivitiesByCity = async (req, res) => {
  try {
    const  cityId  = req.params.cityId;

    // Validate cityId parameter
    if (!cityId || !mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ 
        message: "City ID is required and must be a valid ObjectId" 
      });
    }

    const activities = await Activities.find({ cityId });

    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: "No activities found for this city" });
    }

    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activities.findById(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    // Get the existing activity data first
    const existingActivity = await Activities.findById(id);
    if (!existingActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Handle image0 update but only store in images array
    let processedImage = existingActivity.images[0] || ""; // Get first image from existing array
    
    if (payload.image0 !== undefined) {
      if (payload.image0 && payload.image0.trim() !== "") {
        processedImage = await uploadToCloudinary(payload.image0);
      } else {
        processedImage = "";
      }

      // Update images array (only store this, not image0 field)
      payload.images = processedImage ? [processedImage] : [];
      
      // Remove image0 from payload so it doesn't get stored in DB
      delete payload.image0;
    }

    // Handle essentials - convert string to array if needed
    if (payload.essentials !== undefined) {
      if (typeof payload.essentials === 'string') {
        payload.essentials = payload.essentials.split(',').map(item => item.trim()).filter(item => item);
      }
    }

    // Handle video updates - filter empty values
    if (payload.videos !== undefined) {
      if (Array.isArray(payload.videos)) {
        payload.videos = payload.videos.filter(video => 
          video && typeof video === 'string' && video.trim() !== ""
        );
      } else {
        payload.videos = [];
      }
    }

    // Handle premium checkbox
    if (payload.premium !== undefined) {
      payload.premium = payload.premium ? "PREMIUM" : "FREE";
    }

    console.log("Final payload images array:", payload.images);
    console.log("Final payload videos:", payload.videos);

    const updatedActivity = await Activities.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activities.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Server Error" });
  }
};