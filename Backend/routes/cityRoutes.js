import express from 'express';
import { createCity, getAllcities, getCityById, updateCity } from '../controllers/cityController.js';

const router = express.Router();

// Route to create a new city
router.post('/create', createCity);
router.get('/',getAllcities);
router.get('/:cityId',getCityById);
router.put('/:cityId', updateCity);

export default router;