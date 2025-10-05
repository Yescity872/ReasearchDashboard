// models/PlacesToVisit.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const PlacesToVisitSchema = new mongoose.Schema(
  {
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
    views: { type: Number, default: 0 },
    viewedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        timestamps: [{ type: Date, default: Date.now }]
      }
    ]
  },

  reviews: [
    { type: Schema.Types.ObjectId, 
      ref: "Review" }
    ],

    places: {
      type: String,
      required: true,
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
    enum: ["FREE", "A", "B"],
    default: "FREE",
  },
  },
  { timestamps: true }
);

const PlacesToVisit = mongoose.model("placestovisits", PlacesToVisitSchema);

export default PlacesToVisit;
