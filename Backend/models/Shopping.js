// model/shopping.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const shoppingSchema = new mongoose.Schema({
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

  reviews: [
    { type: Schema.Types.ObjectId, 
      ref: "Review" }
    ],

  flagship: {
    type: Boolean,
    default: false
  },
  shops: {
    type: String,
    required: true
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
    type: String
  },
  famousFor: {
    type: String
  },
  priceRange: {
    type: String
  },
  openDay: {
    type: String
  },
  openTime: {
    type: String
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  images: {
    type: [String],
    default: []
  },
  premium: {
    type: String,
    enum: ["FREE", "A", "B"],
    default: "FREE",
  },
}, { timestamps: true });

const Shopping = mongoose.model("shoppings", shoppingSchema);

export default Shopping;
