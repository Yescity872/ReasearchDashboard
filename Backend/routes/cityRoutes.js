import express from 'express';
import { createCity, getAllcities,getCityById } from '../controllers/cityController.js';

const router = express.Router();

// Route to create a new city
router.post('/create', createCity);
router.get('/',getAllcities);
router.get('/:cityId',getCityById);

export default router;