import City from "../models/City.js";

export const createCity = async (req, res) => {
    try {
        const { cityName } = req.body;
        if (!cityName) {
            return res.status(400).json({ message: "City name is required" });
        }
        // Check if city already exists (case-insensitive)
        let existingCity = await City.findOne({ cityName: { $regex: new RegExp(`^${cityName}$`, 'i') } });
        if (existingCity) {
            return res.status(409).json({ message: "City already exists", cityId: existingCity.cityId });
        }
        const newCity = new City({ cityName });
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
        const city=await City.findOne({cityId});
        if(!city){
            return res.status(404).json({message:"City not found"});
        }
        return res.status(200).json(city);
    } catch (error) {
        console.error("Error fetching city:", error);
        res.status(500).json({ message: "Server error" });
    }
};