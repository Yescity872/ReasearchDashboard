import City from "../models/City.js";

export const getCityId = async (cityName) => {
    try {
        // Find the city by name (case-insensitive)
        const city = await City.findOne({ cityName: { $regex: new RegExp(`^${cityName}$`, 'i') } });

        if (!city) {
            city = await City.create({ cityName, stateOrUT });
        }

        return city.cityId;
    } catch (error) {
        console.error("Error fetching cityId:", error);
        throw new Error("Could not fetch cityId");
    }
};