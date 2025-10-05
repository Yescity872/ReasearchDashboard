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
    views: { type: Number, default: 0 },
    viewedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        timestamps: [{ type: Date, default: Date.now }]
      }
    ]
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
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
    enum: ["FREE", "A", "B"],
    default: "FREE"
  },
  },
  { timestamps: true }
);

const Connectivity = mongoose.model("connectivities", ConnectivitySchema);

export default Connectivity;
