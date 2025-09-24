import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';
const {Schema}=mongoose;

const GeneralCityInfoSchema=new Schema({
    cityId: {
      type: String, // e.g. "68c7454b4ea2df675385f351"
      required: true,
      unique: true, // ensures one cityId per city
      index: true,  // makes lookups faster
      default: uuidv4,
    },
    cityName: {
      type: String,
      required: true,
      trim: true,
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

const GeneralCityInfo=mongoose.model('GeneralCityInfo',GeneralCityInfoSchema);

export default GeneralCityInfo;