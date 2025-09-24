// model/shopping.js
import mongoose from "mongoose";

const shoppingSchema = new mongoose.Schema({
  cityId: {
    type: String,
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
    type: [String], // can be changed to [{ userId, reviewText, rating }]
    default: []
  },
  shops: {
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
  famousFor: {
    type: String
  },
  priceRange: {
    type: String
  },
  openDay: {
    type: String
  },
  openTime: {
    type: String
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  images: {
    type: [String],
    default: []
  },
  image0: {
    type: String
  },
  image1: {
    type: String
  },
  image2: {
    type: String
  },
  premium: {
    type: String,
    default: "FREE"
  }
}, { timestamps: true });

const Shopping = mongoose.model("Shopping", shoppingSchema);

export default Shopping;
