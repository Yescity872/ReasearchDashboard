// models/Connectivity.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const ConnectivitySchema = new Schema(
  {
    cityId: {
      type: String,
      required: true,
      index: true,
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
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Connectivity = mongoose.model("Connectivity", ConnectivitySchema);

export default Connectivity;
