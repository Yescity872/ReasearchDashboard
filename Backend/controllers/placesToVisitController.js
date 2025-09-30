// import PlacesToVisit from "../models/PlacesToVisit.js";
// import { getCityId } from "../utils/getCityId.js";
// import cloudinary from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export const createPlaceToVisit = async (req, res) => {
//   try {
//     const {
//       cityName,
//       places,
//       category,
//       lat,
//       lon,
//       address,
//       locationLink,
//       openDay,
//       openTime,
//       establishYear,
//       fee,
//       description,
//       essential,
//       story,
//       image0,
//       image1,
//       image2,
//       videos,
//       premium,
//     } = req.body;

//     if (!cityName || !places) {
//       return res.status(400).json({ message: "cityName and places are required" });
//     }

//     const cityId = await getCityId(cityName);

//     const doc = new PlacesToVisit({
//       cityId,
//       cityName,
//       places,
//       category,
//       lat,
//       lon,
//       address,
//       locationLink,
//       openDay,
//       openTime,
//       establishYear,
//       fee,
//       description,
//       essential,
//       story,
//       images: [image0, image1, image2].filter(Boolean),
//       videos,
//       premium,
//     });

//     await doc.save();
//     res.status(201).json(doc);
//   } catch (error) {
//     console.error("Error creating place to visit:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getPlacesToVisitByCity = async (req, res) => {
//   try {
//     const { cityId } = req.params;
//     const data = await PlacesToVisit.find({ cityId });
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching places to visit:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getPlaceToVisitById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doc = await PlacesToVisit.findById(id);
//     if (!doc) return res.status(404).json({ message: "Place to visit not found" });
//     res.json(doc);
//   } catch (error) {
//     console.error("Error fetching place to visit:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const updatePlaceToVisit = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await PlacesToVisit.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Place to visit not found" });
//     res.json(updated);
//   } catch (error) {
//     console.error("Error updating place to visit:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const deletePlaceToVisit = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await PlacesToVisit.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ message: "Place to visit not found" });
//     res.json({ message: "Place to visit deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting place to visit:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


import PlacesToVisit from "../models/PlacesToVisit.js";
import { getCityId } from "../utils/getCityId.js";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createPlaceToVisit = async (req, res) => {
  try {
    const {
      cityName,
      places,
      category,
      lat,
      lon,
      address,
      locationLink,
      openDay,
      openTime,
      establishYear,
      fee,
      description,
      essential,
      story,
      image0,
      image1,
      image2,
      videos,
      premium,
    } = req.body;

    if (!cityName || !places) {
      return res.status(400).json({ message: "cityName and places are required" });
    }

    const cityId = await getCityId(cityName);

    // Handle image0 upload to Cloudinary
    let cloudinaryImage0 = image0;
    if (image0 && image0.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(image0, {
          folder: 'places-to-visit-images',
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
    let cloudinaryImage1 = image1;
    if (image1 && image1.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(image1, {
          folder: 'places-to-visit-images',
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
    let cloudinaryImage2 = image2;
    if (image2 && image2.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(image2, {
          folder: 'places-to-visit-images',
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

    // Videos are kept as-is without Cloudinary processing
    const processedVideos = Array.isArray(videos) 
      ? videos.filter(video => video && video.trim() !== "")
      : [];

    const doc = new PlacesToVisit({
      cityId,
      cityName,
      places,
      category,
      lat,
      lon,
      address,
      locationLink,
      openDay,
      openTime,
      establishYear,
      fee,
      description,
      essential,
      story,
      image0: cloudinaryImage0,
      image1: cloudinaryImage1,
      image2: cloudinaryImage2,
      images: [cloudinaryImage0, cloudinaryImage1, cloudinaryImage2].filter(Boolean),
      videos: processedVideos,
      premium,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.error("Error creating place to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPlacesToVisitByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const data = await PlacesToVisit.find({ cityId });
    res.json(data);
  } catch (error) {
    console.error("Error fetching places to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPlaceToVisitById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await PlacesToVisit.findById(id);
    if (!doc) return res.status(404).json({ message: "Place to visit not found" });
    res.json(doc);
  } catch (error) {
    console.error("Error fetching place to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePlaceToVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    // Get the existing place data first
    const existingPlace = await PlacesToVisit.findById(id);
    if (!existingPlace) return res.status(404).json({ message: "Place to visit not found" });

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
              folder: 'places-to-visit-images',
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
            imageUpdates.image0 = existingPlace.image0 || "";
          }
        } else if (isCloudinaryUrl(payload.image0)) {
          imageUpdates.image0 = payload.image0;
        } else if (isRegularUrl(payload.image0)) {
          try {
            console.log("Uploading regular URL image0 to Cloudinary:", payload.image0);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image0, {
              folder: 'places-to-visit-images',
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
              folder: 'places-to-visit-images',
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
            imageUpdates.image1 = existingPlace.image1 || "";
          }
        } else if (isCloudinaryUrl(payload.image1)) {
          imageUpdates.image1 = payload.image1;
        } else if (isRegularUrl(payload.image1)) {
          try {
            console.log("Uploading regular URL image1 to Cloudinary:", payload.image1);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image1, {
              folder: 'places-to-visit-images',
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
              folder: 'places-to-visit-images',
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
            imageUpdates.image2 = existingPlace.image2 || "";
          }
        } else if (isCloudinaryUrl(payload.image2)) {
          imageUpdates.image2 = payload.image2;
        } else if (isRegularUrl(payload.image2)) {
          try {
            console.log("Uploading regular URL image2 to Cloudinary:", payload.image2);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image2, {
              folder: 'places-to-visit-images',
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
      payload.image0 !== undefined ? payload.image0 : existingPlace.image0,
      payload.image1 !== undefined ? payload.image1 : existingPlace.image1,
      payload.image2 !== undefined ? payload.image2 : existingPlace.image2
    ].filter(img => img && img.trim() !== "");

    payload.images = updatedImages;

    console.log("Final payload images:", payload.images);
    console.log("Final payload videos:", payload.videos);

    const updated = await PlacesToVisit.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: "Place to visit not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating place to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePlaceToVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PlacesToVisit.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Place to visit not found" });
    res.json({ message: "Place to visit deleted successfully" });
  } catch (error) {
    console.error("Error deleting place to visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};