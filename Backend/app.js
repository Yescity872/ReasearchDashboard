import express from 'express';
import connectDB from './config/mongodb.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
// import cors from 'cors';
import cors from 'cors';
// import routes
import cityRoutes from './routes/cityRoutes.js';
import cityInfoRoutes from './routes/generalCityInfoRoutes.js';
import accomodationRoutes from './routes/accomodationRoutes.js';
import activitiesRoutes from './routes/activitiesRoutes.js';
import connectivityRoutes from './routes/connectivityRoutes.js';
import hiddenGemsRoutes from './routes/hiddenGemsRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import localTransportRoutes from './routes/localTransportRoutes.js';
import nearbyTouristSpotRoutes from './routes/nearbyTouristSpotRoutes.js';
import placesToVisitRoutes from './routes/placesToVisitRoutes.js';
import shoppingRoutes from './routes/shoppingRoutes.js';
import miscellaneousRoutes from './routes/miscellaneousRoutes.js';

dotenv.config();

const app=express();

app.use(cors());

app.use(morgan('dev'));

const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();

// Additional custom logging for development
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        if (req.body && Object.keys(req.body).length > 0) {
            console.log('Request Body:', req.body);
        }
        next();
    });
}

app.head('/api', (req, res) => {
    res.status(200).end();
});

// Routes 

app.use('/api/cities',cityRoutes);
app.use('/api/cityinfo', cityInfoRoutes);
app.use('/api/accommodation', accomodationRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/connectivity", connectivityRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/hiddengems", hiddenGemsRoutes);
app.use("/api/local-transport", localTransportRoutes);
app.use("/api/nearbytouristspots", nearbyTouristSpotRoutes);
app.use("/api/places", placesToVisitRoutes);
app.use("/api/shopping", shoppingRoutes);
app.use("/api/miscellaneous", miscellaneousRoutes);

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})