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
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  engagement: {
    views: { type: Number, default: 0 },
    viewedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        timestamps: [{ type: Date, default: Date.now }]
      }
    ]
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
    type: String,
    enum: ["FREE", "A", "B"],
    default: "FREE"
  },
  },
  { timestamps: true }
);

const GeneralCityInfo=mongoose.model('cityinfos',GeneralCityInfoSchema);

export default GeneralCityInfo;