import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import qrCodeRoutes from './routes/qrcode.js';
import passwordRoutes from './routes/password.js';
import healthRoutes from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Muitas requisições deste IP, tente novamente em alguns minutos.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/qrcode', qrCodeRoutes);
app.use('/api/v1/password', passwordRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado',
    error: 'NOT_FOUND'
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 E-commerce Utilities API rodando na porta ${PORT}`);
  console.log(`📖 Documentação disponível em: http://localhost:${PORT}/api/v1/health`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
