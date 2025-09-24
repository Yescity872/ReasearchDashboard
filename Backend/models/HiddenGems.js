import mongoose from "mongoose";
const { Schema } = mongoose;

const HiddenGemsSchema = new mongoose.Schema({
  cityId: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
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
  image0: {
    type: String,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  images: {
    type: [String], // multiple image links
  },
  videos: {
    type: String, // YouTube or other links
  },
  premium: {
    type: String,
    default: "Free",
  },
}, { timestamps: true });

const HiddenGem = mongoose.model("HiddenGem", HiddenGemsSchema);
export default HiddenGem;