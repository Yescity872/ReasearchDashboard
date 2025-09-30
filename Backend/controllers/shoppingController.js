import Shopping from "../models/Shopping.js";
import { getCityId } from "../utils/getCityId.js";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createShop = async (req, res) => {
  try {
    const {
      cityName,
      shops,
      flagship,
      lat,
      lon,
      address,
      locationLink,
      famousFor,
      priceRange,
      openDay,
      openTime,
      phone,
      website,
      image0,
      image1,
      image2,
      premium,
    } = req.body;

    if (!cityName || !shops) {
      return res.status(400).json({ message: "cityName and shops are required" });
    }

    const cityId = await getCityId(cityName);

    // Handle image0 upload to Cloudinary
    let cloudinaryImage0 = image0;
    if (image0 && image0.trim() !== "") {
      try {
        const uploadResult = await cloudinary.v2.uploader.upload(image0, {
          folder: 'shopping-images',
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
          folder: 'shopping-images',
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
          folder: 'shopping-images',
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

    const doc = new Shopping({
      cityId,
      cityName,
      shops,
      flagship,
      lat,
      lon,
      address,
      locationLink,
      famousFor,
      priceRange,
      openDay,
      openTime,
      phone,
      website,
      image0: cloudinaryImage0,
      image1: cloudinaryImage1,
      image2: cloudinaryImage2,
      images: [cloudinaryImage0, cloudinaryImage1, cloudinaryImage2].filter(Boolean),
      premium,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getShopsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const data = await Shopping.find({ cityId });
    res.json(data);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Shopping.findById(id);
    if (!doc) return res.status(404).json({ message: "Shop not found" });
    res.json(doc);
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const updateShop = async (req, res) => {
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
    
//     const updated = await Shopping.findByIdAndUpdate(id, payload, { new: true });
//     if (!updated) return res.status(404).json({ message: "Shop not found" });
//     res.json(updated);
//   } catch (error) {
//     console.error("Error updating shop:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const updateShop = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const payload = { ...req.body };

//     // Get the existing shop data first
//     const existingShop = await Shopping.findById(id);
//     if (!existingShop) return res.status(404).json({ message: "Shop not found" });

//     // Handle image updates - preserve existing images if not provided
//     const imageUpdates = {};
    
//     // Handle each image field individually
//     if (payload.image0 !== undefined) {
//       if (payload.image0 && payload.image0.trim() !== "") {
//         try {
//           const uploadResult = await cloudinary.v2.uploader.upload(payload.image0, {
//             folder: 'shopping-images',
//             transformation: [
//               { width: 800, height: 600, crop: 'fill' },
//               { quality: 'auto' },
//               { format: 'webp' }
//             ]
//           });
//           imageUpdates.image0 = uploadResult.secure_url;
//         } catch (uploadError) {
//           console.error("Cloudinary upload error for image0:", uploadError);
//           imageUpdates.image0 = payload.image0; // Use original URL if upload fails
//         }
//       } else {
//         imageUpdates.image0 = ""; // Clear the image
//       }
//     }

//     if (payload.image1 !== undefined) {
//       if (payload.image1 && payload.image1.trim() !== "") {
//         try {
//           const uploadResult = await cloudinary.v2.uploader.upload(payload.image1, {
//             folder: 'shopping-images',
//             transformation: [
//               { width: 800, height: 600, crop: 'fill' },
//               { quality: 'auto' },
//               { format: 'webp' }
//             ]
//           });
//           imageUpdates.image1 = uploadResult.secure_url;
//         } catch (uploadError) {
//           console.error("Cloudinary upload error for image1:", uploadError);
//           imageUpdates.image1 = payload.image1;
//         }
//       } else {
//         imageUpdates.image1 = "";
//       }
//     }

//     if (payload.image2 !== undefined) {
//       if (payload.image2 && payload.image2.trim() !== "") {
//         try {
//           const uploadResult = await cloudinary.v2.uploader.upload(payload.image2, {
//             folder: 'shopping-images',
//             transformation: [
//               { width: 800, height: 600, crop: 'fill' },
//               { quality: 'auto' },
//               { format: 'webp' }
//             ]
//           });
//           imageUpdates.image2 = uploadResult.secure_url;
//         } catch (uploadError) {
//           console.error("Cloudinary upload error for image2:", uploadError);
//           imageUpdates.image2 = payload.image2;
//         }
//       } else {
//         imageUpdates.image2 = "";
//       }
//     }

//     // Merge image updates with payload
//     Object.assign(payload, imageUpdates);

//     // Rebuild images array - use updated values or fall back to existing ones
//     const updatedImages = [
//       payload.image0 !== undefined ? payload.image0 : existingShop.image0,
//       payload.image1 !== undefined ? payload.image1 : existingShop.image1,
//       payload.image2 !== undefined ? payload.image2 : existingShop.image2
//     ].filter(img => img && img.trim() !== "");

//     payload.images = updatedImages;

//     const updated = await Shopping.findByIdAndUpdate(id, payload, { new: true });
//     if (!updated) return res.status(404).json({ message: "Shop not found" });
//     res.json(updated);
//   } catch (error) {
//     console.error("Error updating shop:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const deleteShop = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Shopping.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Shop not found" });
    res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const updateShop = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const payload = { ...req.body };

//     // Get the existing shop data first
//     const existingShop = await Shopping.findById(id);
//     if (!existingShop) return res.status(404).json({ message: "Shop not found" });

//     // Helper function to check if it's a Cloudinary URL
//     const isCloudinaryUrl = (url) => {
//       return url && typeof url === 'string' && url.includes('res.cloudinary.com');
//     };

//     // Helper function to check if it's a base64 image (needs upload)
//     const isBase64Image = (str) => {
//       return str && typeof str === 'string' && str.startsWith('data:image/');
//     };

//     // Handle image updates - preserve existing images if not provided
//     const imageUpdates = {};
    
//     // Handle each image field individually
//     if (payload.image0 !== undefined) {
//       if (payload.image0 && payload.image0.trim() !== "") {
//         // Only upload if it's a new image (base64), not if it's already a Cloudinary URL
//         if (isBase64Image(payload.image0)) {
//           try {
//             const uploadResult = await cloudinary.v2.uploader.upload(payload.image0, {
//               folder: 'shopping-images',
//               transformation: [
//                 { width: 800, height: 600, crop: 'fill' },
//                 { quality: 'auto' },
//                 { format: 'webp' }
//               ]
//             });
//             imageUpdates.image0 = uploadResult.secure_url;
//           } catch (uploadError) {
//             console.error("Cloudinary upload error for image0:", uploadError);
//             imageUpdates.image0 = payload.image0;
//           }
//         } else if (isCloudinaryUrl(payload.image0)) {
//           // It's already a Cloudinary URL, keep it as is
//           imageUpdates.image0 = payload.image0;
//         } else {
//           // Regular URL or other string
//           imageUpdates.image0 = payload.image0;
//         }
//       } else {
//         imageUpdates.image0 = ""; // Clear the image
//       }
//     }

//     // Repeat the same logic for image1 and image2...
//     if (payload.image1 !== undefined) {
//       if (payload.image1 && payload.image1.trim() !== "") {
//         if (isBase64Image(payload.image1)) {
//           try {
//             const uploadResult = await cloudinary.v2.uploader.upload(payload.image1, {
//               folder: 'shopping-images',
//               transformation: [
//                 { width: 800, height: 600, crop: 'fill' },
//                 { quality: 'auto' },
//                 { format: 'webp' }
//               ]
//             });
//             imageUpdates.image1 = uploadResult.secure_url;
//           } catch (uploadError) {
//             console.error("Cloudinary upload error for image1:", uploadError);
//             imageUpdates.image1 = payload.image1;
//           }
//         } else if (isCloudinaryUrl(payload.image1)) {
//           imageUpdates.image1 = payload.image1;
//         } else {
//           imageUpdates.image1 = payload.image1;
//         }
//       } else {
//         imageUpdates.image1 = "";
//       }
//     }

//     if (payload.image2 !== undefined) {
//       if (payload.image2 && payload.image2.trim() !== "") {
//         if (isBase64Image(payload.image2)) {
//           try {
//             const uploadResult = await cloudinary.v2.uploader.upload(payload.image2, {
//               folder: 'shopping-images',
//               transformation: [
//                 { width: 800, height: 600, crop: 'fill' },
//                 { quality: 'auto' },
//                 { format: 'webp' }
//               ]
//             });
//             imageUpdates.image2 = uploadResult.secure_url;
//           } catch (uploadError) {
//             console.error("Cloudinary upload error for image2:", uploadError);
//             imageUpdates.image2 = payload.image2;
//           }
//         } else if (isCloudinaryUrl(payload.image2)) {
//           imageUpdates.image2 = payload.image2;
//         } else {
//           imageUpdates.image2 = payload.image2;
//         }
//       } else {
//         imageUpdates.image2 = "";
//       }
//     }

//     // Merge image updates with payload
//     Object.assign(payload, imageUpdates);

//     // Rebuild images array - use updated values or fall back to existing ones
//     const updatedImages = [
//       payload.image0 !== undefined ? payload.image0 : existingShop.image0,
//       payload.image1 !== undefined ? payload.image1 : existingShop.image1,
//       payload.image2 !== undefined ? payload.image2 : existingShop.image2
//     ].filter(img => img && img.trim() !== "");

//     payload.images = updatedImages;

//     const updated = await Shopping.findByIdAndUpdate(id, payload, { new: true });
//     if (!updated) return res.status(404).json({ message: "Shop not found" });
//     res.json(updated);
//   } catch (error) {
//     console.error("Error updating shop:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const updateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    // Get the existing shop data first
    const existingShop = await Shopping.findById(id);
    if (!existingShop) return res.status(404).json({ message: "Shop not found" });

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
        // Only upload if it's a new image (base64), not if it's already a Cloudinary URL
        if (isBase64Image(payload.image0)) {
          try {
            console.log("Uploading image0 to Cloudinary...");
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image0, {
              folder: 'shopping-images',
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
            console.error("Upload error details:", uploadError.message);
            // Don't save base64 to DB - either use existing image or clear it
            imageUpdates.image0 = existingShop.image0 || "";
          }
        } else if (isCloudinaryUrl(payload.image0)) {
          // It's already a Cloudinary URL, keep it as is
          imageUpdates.image0 = payload.image0;
        } else if (isRegularUrl(payload.image0)) {
          // It's a regular URL (like your current Tanishq URLs), upload it to Cloudinary
          try {
            console.log("Uploading regular URL image0 to Cloudinary:", payload.image0);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image0, {
              folder: 'shopping-images',
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
            // If upload fails, keep the original regular URL
            imageUpdates.image0 = payload.image0;
          }
        } else {
          // Unknown type, keep as is
          imageUpdates.image0 = payload.image0;
        }
      } else {
        imageUpdates.image0 = ""; // Clear the image
      }
    }

    // Repeat the same enhanced logic for image1 and image2
    if (payload.image1 !== undefined) {
      if (payload.image1 && payload.image1.trim() !== "") {
        if (isBase64Image(payload.image1)) {
          try {
            console.log("Uploading image1 to Cloudinary...");
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image1, {
              folder: 'shopping-images',
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
            imageUpdates.image1 = existingShop.image1 || "";
          }
        } else if (isCloudinaryUrl(payload.image1)) {
          imageUpdates.image1 = payload.image1;
        } else if (isRegularUrl(payload.image1)) {
          try {
            console.log("Uploading regular URL image1 to Cloudinary:", payload.image1);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image1, {
              folder: 'shopping-images',
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
              folder: 'shopping-images',
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
            imageUpdates.image2 = existingShop.image2 || "";
          }
        } else if (isCloudinaryUrl(payload.image2)) {
          imageUpdates.image2 = payload.image2;
        } else if (isRegularUrl(payload.image2)) {
          try {
            console.log("Uploading regular URL image2 to Cloudinary:", payload.image2);
            const uploadResult = await cloudinary.v2.uploader.upload(payload.image2, {
              folder: 'shopping-images',
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

    // Merge image updates with payload
    Object.assign(payload, imageUpdates);

    // Rebuild images array - use updated values or fall back to existing ones
    const updatedImages = [
      payload.image0 !== undefined ? payload.image0 : existingShop.image0,
      payload.image1 !== undefined ? payload.image1 : existingShop.image1,
      payload.image2 !== undefined ? payload.image2 : existingShop.image2
    ].filter(img => img && img.trim() !== "");

    payload.images = updatedImages;

    console.log("Final payload images:", payload.images);

    const updated = await Shopping.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: "Shop not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({ message: "Server error" });
  }
};