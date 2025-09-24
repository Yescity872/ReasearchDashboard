import mongoose from "mongoose";
const { Schema } = mongoose;

const HiddenGemsSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
    ref: 'cities', // Add reference to cities collection
    required: true
  },
  cityName: {
    type: String,
    required: true,
  },
  engagement: {
    type: Object, // You can expand this to a specific schema if necessary
    default: {},
  },
  reviews: {
    type: [String], // Reviews stored as an array of strings
    default: [],
  },
  hiddenGem: {
    type: String,
    required: true, // ✅ required field
  },
  category: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
  address: {
    type: String,
  },
  locationLink: {
    type: String,
  },
  openDay: {
    type: String,
  },
  openTime: {
    type: String,
  },
  establishYear: {
    type: String,
  },
  fee: {
    type: String,
  },
  description: {
    type: String,
  },
  essential: {
    type: String,
  },
  story: {
    type: String,
  },
  images: {
    type: [String], // Array of image URLs
    default: [],
  },
  videos: {
    type: [String], // Array of video URLs
    default: [],
  },
  premium: {
    type: String,
    default: "Free",
  },
}, { timestamps: true });

const HiddenGem = mongoose.model("hiddengems", HiddenGemsSchema);
export default HiddenGem;