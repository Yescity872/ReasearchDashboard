import mongoose from "mongoose";
const { Schema } = mongoose;

const HiddenGemsSchema = new mongoose.Schema({
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
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  hiddenGem: {
    type: String,
    required: true, // ✅ required field
  },
  category: {
    type: String,
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
    type: String,
  },
  openDay: {
    type: String,
  },
  openTime: {
    type: String,
  },
  establishYear: {
    type: String,
  },
  fee: {
    type: String,
  },
  description: {
    type: String,
  },
  essential: {
    type: String,
  },
  story: {
    type: String,
  },
  images: {
    type: [String], // Array of image URLs
    default: [],
  },
  videos: {
    type: [String], // Array of video URLs
    default: [],
  },
  premium: {
    type: String,
    enum: ["FREE", "A", "B"],
    default: "FREE"
  },
}, { timestamps: true });

const HiddenGem = mongoose.model("hiddengems", HiddenGemsSchema);
export default HiddenGem;