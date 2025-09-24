// models/activities.js
import mongoose from "mongoose";

const activitiesSchema = new mongoose.Schema({
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
  reviews: {
    type: [String], // could be upgraded to [{ userId, reviewText, rating }]
    default: []
  },
  topActivities: {
    type: String
  },
  bestPlaces: {
    type: String
  },
  description: {
    type: String
  },
  essentials: {
    type: [String],
    default: []
  },
  fee: {
    type: String
  },
  images: {
    type: [String],
    default: []
  },
  videos: {
    type: [String],
    default: []
  },
  premium: {
    type: String,
    default: "FREE"
  }
}, { timestamps: true });

const Activities = mongoose.model("activities", activitiesSchema);

export default Activities;
