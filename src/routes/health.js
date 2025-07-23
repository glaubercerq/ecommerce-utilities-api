import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'E-commerce Utilities API está funcionando!',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      qrcode: {
        'POST /api/v1/qrcode/generate': 'Gera QR Code genérico',
        'POST /api/v1/qrcode/product': 'Gera QR Code para produto',
        'POST /api/v1/qrcode/batch': 'Gera múltiplos QR Codes'
      },
      password: {
        'POST /api/v1/password/generate': 'Gera senha segura',
        'POST /api/v1/password/ecommerce': 'Gera senha para e-commerce',
        'POST /api/v1/password/batch': 'Gera múltiplas senhas'
      },
      health: {
        'GET /api/v1/health': 'Status da API e documentação'
      }
    },
    examples: {
      qrcode_generate: {
        url: 'POST /api/v1/qrcode/generate',
        body: {
          text: 'https://meusite.com/produto/123',
          options: {
            width: 300,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          }
        }
      },
      qrcode_product: {
        url: 'POST /api/v1/qrcode/product',
        body: {
          productId: 'PROD123',
          productName: 'Smartphone XYZ',
          price: 999.99,
          category: 'Eletrônicos',
          storeUrl: 'https://minhaloja.com'
        }
      },
      password_generate: {
        url: 'POST /api/v1/password/generate',
        body: {
          length: 12,
          includeUppercase: true,
          includeLowercase: true,
          includeNumbers: true,
          includeSpecialChars: true
        }
      }
    }
  });
});

export default router;
