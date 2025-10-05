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
    required:true
  },
  content: {
    type: String,
    required:true  },
  engagement: {
    views: { type: Number, default: 0 },
    viewedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        timestamps: [{ type: Date, default: Date.now }]
      }
    ]
  },
  onSite: {type: Boolean, default: false}
},
  { timestamps: true }
)

const City=mongoose.model('cities',CitySchema)

export default City;