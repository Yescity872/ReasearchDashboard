import mongoose from 'mongoose';
const { Schema } = mongoose;

const ActivitiesSchema = new Schema({
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
  topActivities: {
    type: String,
    required: true,
    trim: true,
  },
  bestPlaces: {
    type: String,
  },
  description: {
    type: String,
  },
  essentials: {
    type: String,
  },
  fee: {
    type: String,
  },
  images: {
    type: String, // store multiple images as array
  },
  videos: {
    type: String, // store multiple video links as array
  },
  premium: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Activities = mongoose.model('Activities', ActivitiesSchema);
export default Activities;
