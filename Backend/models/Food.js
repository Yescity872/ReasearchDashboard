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
    views: { type: Number, default: 0 },
    viewedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        timestamps: [{ type: Date, default: Date.now }]
      }
    ]
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
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
       min: 1,
      max: 5,
      default : 1,
    },
    service: {
      type: Number, 
      min: 1, 
      max: 5,
      default: 1,
    },
    taste: {
      type: Number, 
      min: 1, 
      max: 5,
      default: 1,
    },
    hygiene: {
      type: Number, 
      min: 1, 
      max: 5,
      default: 1,
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
    enum: ["FREE", "A", "B"],
    default: "FREE"
  }
  },
  { timestamps: true }
);

const Food = mongoose.model("foods", FoodSchema);

export default Food;
