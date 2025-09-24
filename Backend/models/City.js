import mongoose from 'mongoose'
import {v4 as uuidv4} from 'uuid';
const {Schema,Types}=mongoose;

const CitySchema=new Schema({
    cityId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: uuidv4,
    },
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
},
  { timestamps: true }
)

const City=mongoose.model('City',CitySchema)

export default City;