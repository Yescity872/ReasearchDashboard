import express from 'express';
import { login, createAccount, getProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.post('/create-account', authMiddleware, createAccount);
router.get('/profile', authMiddleware, getProfile);

export default router;