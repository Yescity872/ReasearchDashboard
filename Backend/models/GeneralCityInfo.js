import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';
const {Schema}=mongoose;

const GeneralCityInfoSchema=new Schema({
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
    reviews: {
    type: [String], // Assuming reviews will be stored as an array of strings
    default: [],
  },
  engagement: {
    type: Object, // You can define a more specific schema for engagement if needed
    default: {},
  },
    stateOrUT: {
      type: String,
      default: '',
      trim: true,
    },
    alternateNames: {
      type: [String],
      default: [],
    },
    languagesSpoken: {
      type: [String],
      default: [],
    },
    climateInfo: {
      type: String,
      default: '',
      trim: true,
    },
    bestTimeToVisit: {
      type: String,
      default: '',
      trim: true,
    },
    cityHistory: {
      type: String,
      default: '',
      trim: true,
    },
    coverImage: {
      type: String, // URL
      default: '',
      trim: true,
    },
    premium: {
      type: String, // "Free" or "Premium"
      default: 'Free',
      trim: true,
    },
  },
  { timestamps: true }
);

const GeneralCityInfo=mongoose.model('cityinfos',GeneralCityInfoSchema);

export default GeneralCityInfo;