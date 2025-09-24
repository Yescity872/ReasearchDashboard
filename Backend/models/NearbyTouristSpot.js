// models/NearbyTouristSpot.js
import mongoose from "mongoose";

const NearbyTouristSpotSchema = new mongoose.Schema(
  {
    cityId: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    engagement: {
      type: Object,
      default: {}, // system-managed
    },
    reviews: {
      type: [Object],
      default: [], // system-managed
    },
    places: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    lat: {
      type: Number,
      default: null,
    },
    lon: {
      type: Number,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    locationLink: {
      type: String,
      default: null,
    },
    openDay: {
      type: String,
      default: null,
    },
    openTime: {
      type: String,
      default: null,
    },
    establishYear: {
      type: String,
      default: null,
    },
    fee: {
      type: String,
      default: "FREE",
    },
    description: {
      type: String,
      default: null,
    },
    essential: {
      type: String,
      default: null,
    },
    story: {
      type: String,
      default: null,
    },
    images: {
      type: [String],
      default: [],
    },
    videos: {
      type: [String],
      default: [],
    },
    premium: {
      type: String,
      default: "FREE",
    },
  },
  { timestamps: true }
);

const NearbyTouristSpot = mongoose.model(
  "NearbyTouristSpot",
  NearbyTouristSpotSchema
);

export default NearbyTouristSpot;
