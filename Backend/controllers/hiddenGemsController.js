// import HiddenGem from "../models/HiddenGems.js";
// import { getCityId } from "../utils/getCityId.js";

// import cloudinary from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export const createHiddenGem = async (req, res) => {
//   try {
//     const { cityName, ...hiddenGemData } = req.body;

//     if (!cityName || !hiddenGemData.hiddenGem) {
//       return res.status(400).json({ message: "cityName and hiddenGem are required" });
//     }

//     // get or create cityId
//     const cityId = await getCityId(cityName);

//     // Build images array from image0, image1, image2 only
//     hiddenGemData.images = [hiddenGemData.image0, hiddenGemData.image1, hiddenGemData.image2].filter(Boolean);

//     const newHiddenGem = new HiddenGem({
//       cityId,
//       cityName,
//       ...hiddenGemData,
//     });

//     await newHiddenGem.save();
//     res.status(201).json(newHiddenGem);
//   } catch (error) {
//     console.error("Error adding hidden gem:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get all HiddenGem entries for a city
// export const getHiddenGemsByCity = async (req, res) => {
//   try {
//     const { cityId } = req.params;
//     const hiddenGems = await HiddenGem.find({ cityId });
//     res.json(hiddenGems);
//   } catch (error) {
//     console.error("Error fetching hidden gems data:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get a single HiddenGem entry by ID
// export const getHiddenGemById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const hiddenGem = await HiddenGem.findById(id);

//     if (!hiddenGem) {
//       return res.status(404).json({ message: "HiddenGem entry not found" });
//     }

//     res.json(hiddenGem);
//   } catch (error) {
//     console.error("Error fetching hidden gem by ID:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Update HiddenGem entry
// export const updateHiddenGem = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Rebuild images from image0, image1, image2 if any of them present
//     if (
//       Object.prototype.hasOwnProperty.call(req.body, 'image0') ||
//       Object.prototype.hasOwnProperty.call(req.body, 'image1') ||
//       Object.prototype.hasOwnProperty.call(req.body, 'image2')
//     ) {
//       req.body.images = [req.body.image0, req.body.image1, req.body.image2].filter(Boolean);
//     }

//     const updatedHiddenGem = await HiddenGem.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedHiddenGem) {
//       return res.status(404).json({ message: "HiddenGem entry not found" });
//     }

//     res.json(updatedHiddenGem);
//   } catch (error) {
//     console.error("Error updating hidden gem:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Delete HiddenGem entry
// export const deleteHiddenGem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedHiddenGem = await HiddenGem.findByIdAndDelete(id);

//     if (!deletedHiddenGem) {
//       return res.status(404).json({ message: "HiddenGem entry not found" });
//     }

//     res.json({ message: "HiddenGem entry deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting hidden gem:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get all HiddenGems (optional - if you need this functionality)
// export const getAllHiddenGems = async (req, res) => {
//   try {
//     const hiddenGems = await HiddenGem.find();
//     res.json(hiddenGems);
//   } catch (error) {
//     console.error("Error fetching all hidden gems:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
import HiddenGem from "../models/HiddenGems.js";
import { getCityId } from "../utils/getCityId.js";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createHiddenGem = async (req, res) => {
  try {
    const { cityName, ...hiddenGemData } = req.body;

    if (!cityName || !hiddenGemData.hiddenGem) {
      return res.status(400).json({ message: "cityName and hiddenGem are required" });
    }

    // get or create cityId
    const cityId = await getCityId(cityName);

    // Handle image0 upload to Cloudinary
    let cloudinaryImage0 = hiddenGemData.image0;
    if (hiddenGemData.image0 && hiddenGemData.image0.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(hiddenGemData.image0, {
          folder: 'hidden-gems-images',
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
    let cloudinaryImage1 = hiddenGemData.image1;
    if (hiddenGemData.image1 && hiddenGemData.image1.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(hiddenGemData.image1, {
          folder: 'hidden-gems-images',
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
    let cloudinaryImage2 = hiddenGemData.image2;
    if (hiddenGemData.image2 && hiddenGemData.image2.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(hiddenGemData.image2, {
          folder: 'hidden-gems-images',
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
    const processedVideos = Array.isArray(hiddenGemData.videos) 
      ? hiddenGemData.videos.filter(video => video && video.trim() !== "")
      : [];

    // Build images array from processed images
    hiddenGemData.images = [cloudinaryImage0, cloudinaryImage1, cloudinaryImage2].filter(Boolean);
    hiddenGemData.image0 = cloudinaryImage0;
    hiddenGemData.image1 = cloudinaryImage1;
    hiddenGemData.image2 = cloudinaryImage2;
    hiddenGemData.videos = processedVideos;

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
    const payload = { ...req.body };

    // Get the existing hidden gem data first
    const existingGem = await HiddenGem.findById(id);
    if (!existingGem) {
      return res.status(404).json({ message: "HiddenGem entry not found" });
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
              folder: 'hidden-gems-images',
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
            imageUpdates.image0 = existingGem.image0 || "";
          }
        } else if (isCloudinaryUrl(payload.image0)) {
          imageUpdates.image0 = payload.image0;
        } else if (isRegularUrl(payload.image0)) {
          try {
            console.log("Uploading regular URL image0 to Cloudinary:", payload.image0);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image0, {
              folder: 'hidden-gems-images',
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
              folder: 'hidden-gems-images',
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
            imageUpdates.image1 = existingGem.image1 || "";
          }
        } else if (isCloudinaryUrl(payload.image1)) {
          imageUpdates.image1 = payload.image1;
        } else if (isRegularUrl(payload.image1)) {
          try {
            console.log("Uploading regular URL image1 to Cloudinary:", payload.image1);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image1, {
              folder: 'hidden-gems-images',
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
              folder: 'hidden-gems-images',
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
            imageUpdates.image2 = existingGem.image2 || "";
          }
        } else if (isCloudinaryUrl(payload.image2)) {
          imageUpdates.image2 = payload.image2;
        } else if (isRegularUrl(payload.image2)) {
          try {
            console.log("Uploading regular URL image2 to Cloudinary:", payload.image2);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image2, {
              folder: 'hidden-gems-images',
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
      payload.image0 !== undefined ? payload.image0 : existingGem.image0,
      payload.image1 !== undefined ? payload.image1 : existingGem.image1,
      payload.image2 !== undefined ? payload.image2 : existingGem.image2
    ].filter(img => img && img.trim() !== "");

    payload.images = updatedImages;

    console.log("Final payload images:", payload.images);
    console.log("Final payload videos:", payload.videos);

    const updatedHiddenGem = await HiddenGem.findByIdAndUpdate(id, payload, {
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
