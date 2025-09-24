import mongoose from 'mongoose'
import {v4 as uuidv4} from 'uuid';
const {Schema,Types}=mongoose;

const CitySchema=new Schema({
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
    type: String,
  },
  content: {
    type: String,
  },
  engagement: {
    type: Object,
    default: {},
  },
},
  { timestamps: true }
)

const City=mongoose.model('cities',CitySchema)

export default City;