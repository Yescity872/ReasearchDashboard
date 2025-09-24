import mongoose from "mongoose";
const { Schema } = mongoose;

const FoodSchema = new Schema(
  {
    cityId: {
      type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
    ref: 'cities', // Add reference to cities collection
    required: true
    },
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
    engagement: {
    type: Object,
    default: {},
  },
  reviews: {
    type: [String], // Can later expand to sub-schema for rating + comment
    default: [],
  },
    flagship: {
      type: Boolean,
      default: false,
    },
    foodPlace: {
      type: String,
      required: true,
      trim: true,
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
    address: {
      type: String,
      trim: true,
    },
    locationLink: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
    },
    vegOrNonVeg: {
      type: String,
      enum: ["Veg", "NonVeg", "Both"],
      default: "Veg",
    },
    valueForMoney: {
      type: Number,
      default : 0,
    },
    service: {
      type: Number,
      default: 0,
    },
    taste: {
      type: Number,
      default: 0,
    },
    hygiene: {
      type: Number,
      default: 0,
    },
    menuSpecial: {
      type: String,
      trim: true,
    },
    menuLink: {
      type: String,
    },
    openDay: {
      type: String,
    },
    openTime: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
    type: [String], // Array of image URLs
    default: [],
  },
  videos: {
    type: [String], // Array of video URLs
  },
    premium: {
      type: String,
      default: "Free",
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("foods", FoodSchema);

export default Food;
