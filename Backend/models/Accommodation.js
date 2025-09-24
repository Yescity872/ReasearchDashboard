import mongoose from 'mongoose';
const {Schema}=mongoose;

const AccommodationSchema = new Schema({
  cityId: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
    trim: true,
  },
  flagShip: {
    type: Boolean,
    default: true,
  },
  hotels: {
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
  },
  locationLink: {
    type: String,
  },
  category: {
    type: String,
  },
  minPrice: {
    type: String,
  },
  maxPrice: {
    type: String,
  },
  roomTypes: {
    type: [String],
  },
  facilities: {
    type: [String],
  },
  image0: {
    type: String,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  images: {
    type: [String],
  },
  premium: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Accommodation = mongoose.model('Accommodation', AccommodationSchema);
export default Accommodation;
