import mongoose from "mongoose";

const localTransportSchema = new mongoose.Schema({
    cityId: { 
        type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
    ref: 'cities', // Add reference to cities collection
    required: true
    },
    cityName: {
        type:String
    },
    engagement: {
    type: Object, // You can expand this to a specific schema if necessary
    default: {},
  },
  reviews: {
    type: [String], // Reviews stored as an array of strings
    default: [],
  },
    from: { 
        type: String, 
        required: true 
    },
    to: { 
        type: String, 
        required: true 
    },
    autoPrice: {
        type:String
    },
    cabPrice: {
        type:String
    },
    bikePrice: { 
        type:String
    },
    premium: {
        type: String,
        default: "Free",
    }
}, { timestamps: true });

const LocalTransport = mongoose.model("localtransports", localTransportSchema);
export default LocalTransport;
