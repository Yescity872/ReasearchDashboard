// import Food from "../models/Food.js";
// import { getCityId } from "../utils/getCityId.js";
// import cloudinary from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export const addFood = async (req, res) => {
//   try {
//     const { cityName, ...foodData } = req.body;

//     if (!cityName || !foodData.foodPlace) {
//       return res.status(400).json({ message: "cityName and foodPlace are required" });
//     }

//     // get or create cityId
//     const cityId = await getCityId(cityName);

//     const newFood = new Food({
//       cityId,
//       cityName,
//       ...foodData,
//       images: [foodData.image0, foodData.image1, foodData.image2].filter(Boolean),
//     });

//     await newFood.save();
//     res.status(201).json(newFood);
//   } catch (error) {
//     console.error("Error adding food:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get all Food entries for a city
// export const getFoodByCity = async (req, res) => {
//   try {
//     const { cityId } = req.params;
//     const foods = await Food.find({ cityId });
//     res.json(foods);
//   } catch (error) {
//     console.error("Error fetching food data:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get a single Food entry by ID
// export const getFoodById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const food = await Food.findById(id);

//     if (!food) {
//       return res.status(404).json({ message: "Food entry not found" });
//     }

//     res.json(food);
//   } catch (error) {
//     console.error("Error fetching food by ID:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Update Food entry
// export const updateFood = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const payload = { ...req.body };
//     if (
//       Object.prototype.hasOwnProperty.call(payload, 'image0') ||
//       Object.prototype.hasOwnProperty.call(payload, 'image1') ||
//       Object.prototype.hasOwnProperty.call(payload, 'image2')
//     ) {
//       payload.images = [payload.image0, payload.image1, payload.image2].filter(Boolean);
//     }
//     const updatedFood = await Food.findByIdAndUpdate(id, payload, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedFood) {
//       return res.status(404).json({ message: "Food entry not found" });
//     }

//     res.json(updatedFood);
//   } catch (error) {
//     console.error("Error updating food:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Delete Food entry
// export const deleteFood = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedFood = await Food.findByIdAndDelete(id);

//     if (!deletedFood) {
//       return res.status(404).json({ message: "Food entry not found" });
//     }

//     res.json({ message: "Food entry deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting food:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import Food from "../models/Food.js";
import { getCityId } from "../utils/getCityId.js";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const addFood = async (req, res) => {
  try {
    const { cityName, ...foodData } = req.body;

    if (!cityName || !foodData.foodPlace) {
      return res.status(400).json({ message: "cityName and foodPlace are required" });
    }

    // get or create cityId
    const cityId = await getCityId(cityName);

    // Handle image0 upload to Cloudinary
    let cloudinaryImage0 = foodData.image0;
    if (foodData.image0 && foodData.image0.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(foodData.image0, {
          folder: 'food-images',
          transformation: [
            { width: 800, height: 600, crop: 'fill' },
            { quality: 'auto' },
            { format: 'webp' }
          ]
        });
        cloudinaryImage0 = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error for image0:", uploadError);
        // Continue with original URL if upload fails
      }
    }

    // Handle image1 upload to Cloudinary
    let cloudinaryImage1 = foodData.image1;
    if (foodData.image1 && foodData.image1.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(foodData.image1, {
          folder: 'food-images',
          transformation: [
            { width: 800, height: 600, crop: 'fill' },
            { quality: 'auto' },
            { format: 'webp' }
          ]
        });
        cloudinaryImage1 = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error for image1:", uploadError);
        // Continue with original URL if upload fails
      }
    }

    // Handle image2 upload to Cloudinary
    let cloudinaryImage2 = foodData.image2;
    if (foodData.image2 && foodData.image2.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(foodData.image2, {
          folder: 'food-images',
          transformation: [
            { width: 800, height: 600, crop: 'fill' },
            { quality: 'auto' },
            { format: 'webp' }
          ]
        });
        cloudinaryImage2 = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error for image2:", uploadError);
        // Continue with original URL if upload fails
      }
    }

    // Handle videos - filter empty values
    const processedVideos = Array.isArray(foodData.videos) 
      ? foodData.videos.filter(video => video && video.trim() !== "")
      : [];

    // Build images array from processed images
    foodData.images = [cloudinaryImage0, cloudinaryImage1, cloudinaryImage2].filter(Boolean);
    foodData.image0 = cloudinaryImage0;
    foodData.image1 = cloudinaryImage1;
    foodData.image2 = cloudinaryImage2;
    foodData.videos = processedVideos;

    const newFood = new Food({
      cityId,
      cityName,
      ...foodData,
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

    // Get the existing food data first
    const existingFood = await Food.findById(id);
    if (!existingFood) {
      return res.status(404).json({ message: "Food entry not found" });
    }

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

    // Handle image updates
    const imageUpdates = {};
    
    // Handle each image field individually
    if (payload.image0 !== undefined) {
      if (payload.image0 && payload.image0.trim() !== "") {
        if (isBase64Image(payload.image0)) {
          try {
            console.log("Uploading image0 to Cloudinary...");
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image0, {
              folder: 'food-images',
              transformation: [
                { width: 800, height: 600, crop: 'fill' },
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for image0:", uploadResult.secure_url);
            imageUpdates.image0 = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for image0:", uploadError);
            imageUpdates.image0 = existingFood.image0 || "";
          }
        } else if (isCloudinaryUrl(payload.image0)) {
          imageUpdates.image0 = payload.image0;
        } else if (isRegularUrl(payload.image0)) {
          try {
            console.log("Uploading regular URL image0 to Cloudinary:", payload.image0);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image0, {
              folder: 'food-images',
              transformation: [
                { width: 800, height: 600, crop: 'fill' },
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for regular URL image0:", uploadResult.secure_url);
            imageUpdates.image0 = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for regular URL image0:", uploadError);
            imageUpdates.image0 = payload.image0;
          }
        } else {
          imageUpdates.image0 = payload.image0;
        }
      } else {
        imageUpdates.image0 = "";
      }
    }

    // Repeat the same enhanced logic for image1 and image2
    if (payload.image1 !== undefined) {
      if (payload.image1 && payload.image1.trim() !== "") {
        if (isBase64Image(payload.image1)) {
          try {
            console.log("Uploading image1 to Cloudinary...");
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image1, {
              folder: 'food-images',
              transformation: [
                { width: 800, height: 600, crop: 'fill' },
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for image1:", uploadResult.secure_url);
            imageUpdates.image1 = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for image1:", uploadError);
            imageUpdates.image1 = existingFood.image1 || "";
          }
        } else if (isCloudinaryUrl(payload.image1)) {
          imageUpdates.image1 = payload.image1;
        } else if (isRegularUrl(payload.image1)) {
          try {
            console.log("Uploading regular URL image1 to Cloudinary:", payload.image1);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image1, {
              folder: 'food-images',
              transformation: [
                { width: 800, height: 600, crop: 'fill' },
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for regular URL image1:", uploadResult.secure_url);
            imageUpdates.image1 = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for regular URL image1:", uploadError);
            imageUpdates.image1 = payload.image1;
          }
        } else {
          imageUpdates.image1 = payload.image1;
        }
      } else {
        imageUpdates.image1 = "";
      }
    }

    if (payload.image2 !== undefined) {
      if (payload.image2 && payload.image2.trim() !== "") {
        if (isBase64Image(payload.image2)) {
          try {
            console.log("Uploading image2 to Cloudinary...");
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image2, {
              folder: 'food-images',
              transformation: [
                { width: 800, height: 600, crop: 'fill' },
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for image2:", uploadResult.secure_url);
            imageUpdates.image2 = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for image2:", uploadError);
            imageUpdates.image2 = existingFood.image2 || "";
          }
        } else if (isCloudinaryUrl(payload.image2)) {
          imageUpdates.image2 = payload.image2;
        } else if (isRegularUrl(payload.image2)) {
          try {
            console.log("Uploading regular URL image2 to Cloudinary:", payload.image2);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image2, {
              folder: 'food-images',
              transformation: [
                { width: 800, height: 600, crop: 'fill' },
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for regular URL image2:", uploadResult.secure_url);
            imageUpdates.image2 = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for regular URL image2:", uploadError);
            imageUpdates.image2 = payload.image2;
          }
        } else {
          imageUpdates.image2 = payload.image2;
        }
      } else {
        imageUpdates.image2 = "";
      }
    }

    // Handle video updates - no Cloudinary processing, just filter empty values
    if (payload.videos !== undefined) {
      if (Array.isArray(payload.videos)) {
        payload.videos = payload.videos.filter(video => video && video.trim() !== "");
      } else {
        payload.videos = [];
      }
    }

    // Merge image updates with payload
    Object.assign(payload, imageUpdates);

    // Rebuild images array - use updated values or fall back to existing ones
    const updatedImages = [
      payload.image0 !== undefined ? payload.image0 : existingFood.image0,
      payload.image1 !== undefined ? payload.image1 : existingFood.image1,
      payload.image2 !== undefined ? payload.image2 : existingFood.image2
    ].filter(img => img && img.trim() !== "");

    payload.images = updatedImages;

    console.log("Final payload images:", payload.images);
    console.log("Final payload videos:", payload.videos);

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