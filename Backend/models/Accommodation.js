// models/accommodations.js
import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
    ref: 'cities', // Add reference to cities collection
    required: true
  },
  cityName: {
    type: String,
    required: true
  },
  engagement: {
    type: Object,
    default: {}
  },
  flagship: {
    type: Boolean,
    default: false
  },
  reviews: {
    type: [String], // can be enhanced to [{ userId, reviewText, rating }]
    default: []
  },
  hotels: {
    type: String,
    required: true
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
    type: String
  },
  category: {
    type: String // e.g. "5-star hotel"
  },
  roomTypes: {
    type: String // can also be [String] if you want multiple stored as array
  },
  facilities: {
    type: String // same, could be [String] if needed
  },
  images: {
    type: [String],
    default: []
  },
  premium: {
    type: String,
    default: "FREE"
  }
}, { timestamps: true });

const Accommodation = mongoose.model("accommodations", accommodationSchema);

export default Accommodation;
