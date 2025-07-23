# API Documentation - E-commerce Utilities

## Base URL
```
http://localhost:3000/api/v1
```

## Endpoints

### Health Check
- **GET** `/health` - Status da API e documentação

### QR Code Generation

#### Generate Generic QR Code
- **POST** `/qrcode/generate`
- **Body:**
```json
{
  "text": "https://example.com",
  "options": {
    "width": 300,
    "margin": 2,
    "color": {
      "dark": "#000000",
      "light": "#FFFFFF"
    },
    "errorCorrectionLevel": "M"
  }
}
```

#### Generate Product QR Code
- **POST** `/qrcode/product`
- **Body:**
```json
{
  "productId": "PROD123",
  "productName": "Smartphone XYZ",
  "price": 999.99,
  "category": "Eletrônicos",
  "storeUrl": "https://minhaloja.com",
  "description": "Smartphone com 128GB",
  "imageUrl": "https://minhaloja.com/images/prod123.jpg"
}
```

#### Generate Batch QR Codes
- **POST** `/qrcode/batch`
- **Body:**
```json
{
  "items": [
    { "text": "https://example1.com" },
    { "text": "https://example2.com" }
  ],
  "options": {
    "width": 200,
    "margin": 1
  }
}
```

### Password Generation

#### Generate Secure Password
- **POST** `/password/generate`
- **Body:**
```json
{
  "length": 12,
  "includeUppercase": true,
  "includeLowercase": true,
  "includeNumbers": true,
  "includeSpecialChars": true,
  "excludeSimilar": false
}
```

#### Generate E-commerce Password
- **POST** `/password/ecommerce`
- **Body:**
```json
{
  "type": "admin",
  "userRole": "super_admin",
  "customLength": 16
}
```

Types: `customer`, `admin`, `api_key`, `temporary`

#### Generate Batch Passwords
- **POST** `/password/batch`
- **Body:**
```json
{
  "count": 5,
  "type": "customer",
  "options": {
    "length": 10,
    "includeSpecialChars": false
  }
}
```

## Response Format

All responses follow this structure:

```json
{
  "success": boolean,
  "message": "string",
  "data": object,
  "error": "string (optional)"
}
```

## Error Codes

- `VALIDATION_ERROR` - Dados de entrada inválidos
- `RATE_LIMIT_EXCEEDED` - Muitas requisições
- `BATCH_SIZE_EXCEEDED` - Lote muito grande
- `INTERNAL_ERROR` - Erro interno do servidor
- `NOT_FOUND` - Endpoint não encontrado

## Rate Limiting

- 100 requests per 15 minutes per IP
- Headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
