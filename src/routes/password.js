import express from 'express';
import { validatePasswordRequest } from '../middleware/validation.js';
import { generatePassword, generateBatchPasswords, generateEcommercePassword } from '../controllers/passwordController.js';

const router = express.Router();

router.post('/generate', validatePasswordRequest, generatePassword);
router.post('/ecommerce', generateEcommercePassword);
router.post('/batch', generateBatchPasswords);

export default router;
