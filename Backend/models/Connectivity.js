// models/Connectivity.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const ConnectivitySchema = new Schema(
  {
    cityId: {
      type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
    ref: 'cities', // Add reference to cities collection
    required: true
    },
    engagement: {
    type: Object,
    default: {},
  },
  reviews: {
    type: [String], // or you can define a subdocument schema if reviews need more fields
    default: [],
  },
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
    nearestAirportStationBusStand: {
      type: String,
      required: true, // ✅ Required field
      trim: true,
    },
    distance: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
    locationLink: {
      type: String,
    },
    majorFlightsTrainsBuses: {
      type: String,
    },
    premium: {
      type: String,
      default: "FREE",
    },
  },
  { timestamps: true }
);

const Connectivity = mongoose.model("connectivities", ConnectivitySchema);

export default Connectivity;
