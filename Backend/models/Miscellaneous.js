// models/miscellaneous.js
import mongoose from "mongoose";

const MiscellaneousSchema = new mongoose.Schema(
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
      default: {}, // empty object
    },
    reviews: {
      type: [Object],
      default: [], // empty array
    },
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
      default: "FREE",
    },
  },
  { timestamps: true }
);

const Miscellaneous = mongoose.model("Miscellaneous", MiscellaneousSchema);
export default Miscellaneous;
