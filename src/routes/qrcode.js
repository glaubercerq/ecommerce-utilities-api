import express from 'express';
import { validateQRCodeRequest } from '../middleware/validation.js';
import { generateQRCode, generateProductQRCode, generateBatchQRCodes } from '../controllers/qrCodeController.js';

const router = express.Router();

router.post('/generate', validateQRCodeRequest, generateQRCode);
router.post('/product', generateProductQRCode);
router.post('/batch', generateBatchQRCodes);

export default router;
