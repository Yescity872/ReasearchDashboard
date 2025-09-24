import mongoose from "mongoose";

const localTransportSchema = new mongoose.Schema({
    cityId: { 
        type: String, 
        required: true 
    },
    cityName: {
        type:String
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

const LocalTransport = mongoose.model("LocalTransport", localTransportSchema);
export default LocalTransport;
