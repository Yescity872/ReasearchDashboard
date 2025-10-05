// models/miscellaneous.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const MiscellaneousSchema = new mongoose.Schema(
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
    localMap: {
      type: String,
      default: null,
    },
    emergencyContacts: {
      type: String,
      default: null,
    },
    hospital: {
      type: String,
      default: null,
    },
    hospitalLocationLink: {
      type: String,
      default: null,
    },
    hospitalLat: {
      type: Number,
      default: null,
    },
    hospitalLon: {
      type: Number,
      default: null,
    },
    PoliceLocationLink: {
      type: String,
      default: null,
    },
    PoliceLat: {
      type: Number,
      default: null,
    },
    PoliceLon: {
      type: Number,
      default: null,
    },
    parking: {
      type: String,
      default: null,
    },
    parkingLocationLink: {
      type: String,
      default: null,
    },
    parkingLat: {
      type: Number,
      default: null,
    },
    parkingLon: {
      type: Number,
      default: null,
    },
    publicWashrooms: {
      type: String,
      default: null,
    },
    publicWashroomsLocationLink: {
      type: String,
      default: null,
    },
    publicWashroomsLat: {
      type: Number,
      default: null,
    },
    publicWashroomsLon: {
      type: Number,
      default: null,
    },
    premium: {
    type: String,
    enum: ["FREE", "A", "B"],
    default: "FREE"
  }
  },
  { timestamps: true }
);

const Miscellaneous = mongoose.model("miscellaneous", MiscellaneousSchema);
export default Miscellaneous;
