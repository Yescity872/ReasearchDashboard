import mongoose from "mongoose";
const { Schema } = mongoose;

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
    views: { type: Number, default: 0 },
    viewedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        timestamps: [{ type: Date, default: Date.now }]
      }
    ]
  },

  reviews: [
    { type: Schema.Types.ObjectId, 
        ref: "Review" }
    ],

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
    enum: ["FREE", "A", "B"],
    default: "FREE",
  },
}, { timestamps: true });

const LocalTransport = mongoose.model("localtransports", localTransportSchema);
export default LocalTransport;
