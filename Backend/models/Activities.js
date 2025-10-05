// models/activities.js
import mongoose from "mongoose";
import { Schema } from "mongoose";

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
    views: { type: Number, default: 0 },
    viewedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        timestamps: [{ type: Date, default: Date.now }]
      }
    ]
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
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
    enum: ["FREE", "A", "B"],
    default: "FREE"
  },
}, { timestamps: true });

const Activities = mongoose.model("activities", activitiesSchema);

export default Activities;
