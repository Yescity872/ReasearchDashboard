import mongoose from "mongoose";
const { Schema } = mongoose;

const FoodSchema = new Schema(
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
    },
    valueForMoney: {
      type: Number,
      min: 0,
      max: 5,
    },
    service: {
      type: Number,
      min: 0,
      max: 5,
    },
    taste: {
      type: Number,
      min: 0,
      max: 5,
    },
    hygiene: {
      type: Number,
      min: 0,
      max: 5,
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
    image0: { type: String },
    image1: { type: String },
    image2: { type: String },
    images: [{ type: String }], // multiple images array
    videos: { type: String }, // multiple videos array
    premium: {
      type: String,
      default: "Free",
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", FoodSchema);

export default Food;
