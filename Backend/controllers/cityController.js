import City from "../models/City.js";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createCity = async (req, res) => {
    try {
        const { cityName,coverImage,content } = req.body;
        if (!cityName) {
            return res.status(400).json({ message: "City name is required" });
        }
        // Check if city already exists (case-insensitive)
        let existingCity = await City.findOne({ cityName: { $regex: new RegExp(`^${cityName}$`, 'i') } });
        if (existingCity) {
            return res.status(409).json({ message: "City already exists", cityId: existingCity.cityId });
        }
        let cloudinaryImageUrl = coverImage;
        if (coverImage && coverImage.trim() !== "") {
            try {
                // Upload image to Cloudinary
                const uploadResult = await cloudinary.v2.uploader.upload(coverImage, {
                    folder: 'city-covers',
                    transformation: [
                        { width: 1200, height: 630, crop: 'fill' },
                        { quality: 'auto' },
                        { format: 'webp' }
                    ]
                });
                
                cloudinaryImageUrl = uploadResult.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                // If upload fails, use the original URL or handle error as needed
                // You can choose to proceed with original URL or return error
                // return res.status(400).json({ message: "Invalid image URL" });
            }
        }
        const newCity = new City({
      cityName,
      coverImage:cloudinaryImageUrl,
      content,
    });
        await newCity.save();
        res.status(201).json({ message: "City created successfully", cityId: newCity.cityId });
    } catch (error) {
        console.error("Error creating city:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllcities = async (req, res) => {
    try {
        const cities = await City.find().sort({ cityName: 1 });
        // Add cityId as an alias for _id for frontend compatibility
    const citiesWithCityId = cities.map(city => ({
      ...city.toObject(),
      cityId: city._id
    }));
        return res.status(200).json(citiesWithCityId);
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getCityById=async(req,res)=>{
    try {
        const {cityId}=req.params;
        const city=await City.findOne(cityId);
        if(!city){
            return res.status(404).json({message:"City not found"});
        }
        return res.status(200).json(city);
    } catch (error) {
        console.error("Error fetching city:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateCity = async (req, res) => {
    try {
        const { cityId } = req.params;
        const { cityName, coverImage, content, onSite } = req.body;

        // Find the city by ID
        const city = await City.findById(cityId);
        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        // Check if cityName is being updated and if it conflicts with existing city
        if (cityName && cityName !== city.cityName) {
            const existingCity = await City.findOne({ 
                cityName: { $regex: new RegExp(`^${cityName}$`, 'i') },
                _id: { $ne: cityId } // Exclude current city
            });
            if (existingCity) {
                return res.status(409).json({ message: "City name already exists" });
            }
        }

        // Handle cover image upload if provided
        let cloudinaryImageUrl = coverImage;
        if (coverImage && coverImage.trim() !== "" && coverImage !== city.coverImage) {
            try {
                // Upload image to Cloudinary
                const uploadResult = await cloudinary.v2.uploader.upload(coverImage, {
                    folder: 'city-covers',
                    transformation: [
                        { width: 1200, height: 630, crop: 'fill' },
                        { quality: 'auto' },
                        { format: 'webp' }
                    ]
                });
                
                cloudinaryImageUrl = uploadResult.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                // Continue with original URL if upload fails
            }
        }

        // Update city fields
        if (cityName) city.cityName = cityName;
        if (coverImage) city.coverImage = cloudinaryImageUrl;
        if (content !== undefined) city.content = content;
        if (onSite !== undefined) city.onSite = onSite;

        await city.save();

        res.status(200).json({ 
            message: "City updated successfully", 
            city: {
                ...city.toObject(),
                cityId: city._id
            }
        });
    } catch (error) {
        console.error("Error updating city:", error);
        res.status(500).json({ message: "Server error" });
    }
};