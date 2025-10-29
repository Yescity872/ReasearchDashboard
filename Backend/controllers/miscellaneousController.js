import Miscellaneous from "../models/Miscellaneous.js";
import { getCityId } from "../utils/getCityId.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createMiscellaneous = async (req, res) => {
  try {
    const { cityName, engagement, reviews,localMap, ...rest } = req.body;

    if (!cityName) {
      return res.status(400).json({ message: "cityName is required" });
    }

    const cityId = await getCityId(cityName);

    // Handle localMap upload to Cloudinary
    let cloudinaryLocalMap = localMap;
    if (localMap && localMap.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(localMap, {
          folder: 'miscellaneous-maps',
          transformation: [
            { quality: 'auto' },
            { format: 'webp' }
          ]
        });
        cloudinaryLocalMap = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error for localMap:", uploadError);
        // Continue with original URL if upload fails
      }
    }

    const doc = new Miscellaneous({
      cityId,
      cityName,
      engagement,
      reviews,
      localMap: cloudinaryLocalMap,
      ...rest,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.error("Error creating miscellaneous:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMiscellaneousByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const data = await Miscellaneous.find({ cityId });
    res.json(data);
  } catch (error) {
    console.error("Error fetching miscellaneous:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMiscellaneousById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Miscellaneous.findById(id);
    if (!doc) return res.status(404).json({ message: "Miscellaneous not found" });
    res.json(doc);
  } catch (error) {
    console.error("Error fetching miscellaneous by id:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const updateMiscellaneous = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await Miscellaneous.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Miscellaneous not found" });
//     res.json(updated);
//   } catch (error) {
//     console.error("Error updating miscellaneous:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const updateMiscellaneous = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    // Get the existing miscellaneous data first
    const existingMiscellaneous = await Miscellaneous.findById(id);
    if (!existingMiscellaneous) return res.status(404).json({ message: "Miscellaneous not found" });

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

    // Handle localMap update
    if (payload.localMap !== undefined) {
      if (payload.localMap && payload.localMap.trim() !== "") {
        // Only upload if it's a new image (base64), not if it's already a Cloudinary URL
        if (isBase64Image(payload.localMap)) {
          try {
            console.log("Uploading localMap to Cloudinary...");
            const uploadResult = await cloudinary.v2.uploader.upload(payload.localMap, {
              folder: 'miscellaneous-maps',
              transformation: [
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for localMap:", uploadResult.secure_url);
            payload.localMap = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for localMap:", uploadError);
            console.error("Upload error details:", uploadError.message);
            // Don't save base64 to DB - either use existing image or clear it
            payload.localMap = existingMiscellaneous.localMap || "";
          }
        } else if (isCloudinaryUrl(payload.localMap)) {
          // It's already a Cloudinary URL, keep it as is
          // No changes needed
        } else if (isRegularUrl(payload.localMap)) {
          // It's a regular URL, upload it to Cloudinary
          try {
            console.log("Uploading regular URL localMap to Cloudinary:", payload.localMap);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.localMap, {
              folder: 'miscellaneous-maps',
              transformation: [
                { quality: 'auto' },
                { format: 'webp' }
              ]
            });
            console.log("Cloudinary upload successful for regular URL localMap:", uploadResult.secure_url);
            payload.localMap = uploadResult.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload error for regular URL localMap:", uploadError);
            // If upload fails, keep the original regular URL
            // No changes needed - payload.localMap remains as the regular URL
          }
        }
        // If it's none of the above types, it remains as is
      } else {
        payload.localMap = ""; // Clear the localMap
      }
    }

    const updated = await Miscellaneous.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: "Miscellaneous not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating miscellaneous:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteMiscellaneous = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Miscellaneous.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Miscellaneous not found" });
    res.json({ message: "Miscellaneous deleted successfully" });
  } catch (error) {
    console.error("Error deleting miscellaneous:", error);
    res.status(500).json({ message: "Server error" });
  }
};


