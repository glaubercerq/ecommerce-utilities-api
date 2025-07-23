# Testes da E-commerce Utilities API

Este arquivo contém exemplos de como testar todos os endpoints da API.

## 1. Health Check

```bash
curl http://localhost:3000/api/v1/health
```

## 2. QR Code - Genérico

```bash
curl -X POST http://localhost:3000/api/v1/qrcode/generate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "https://meusite.com/produto/123",
    "options": {
      "width": 300,
      "margin": 2,
      "color": {
        "dark": "#000000",
        "light": "#FFFFFF"
      }
    }
  }'
```

## 3. QR Code - Produto E-commerce

```bash
curl -X POST http://localhost:3000/api/v1/qrcode/product \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PROD123",
    "productName": "Smartphone XYZ Pro",
    "price": 1299.99,
    "category": "Eletrônicos",
    "storeUrl": "https://minhaloja.com",
    "description": "Smartphone top de linha com 256GB",
    "imageUrl": "https://minhaloja.com/images/smartphone-xyz.jpg"
  }'
```

## 4. QR Code - Lote

```bash
curl -X POST http://localhost:3000/api/v1/qrcode/batch \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      { "text": "https://minhaloja.com/produto/1" },
      { "text": "https://minhaloja.com/produto/2" },
      { "text": "https://minhaloja.com/categoria/eletronicos" }
    ],
    "options": {
      "width": 200,
      "margin": 1
    }
  }'
```

## 5. Senha - Genérica

```bash
curl -X POST http://localhost:3000/api/v1/password/generate \
  -H "Content-Type: application/json" \
  -d '{
    "length": 16,
    "includeUppercase": true,
    "includeLowercase": true,
    "includeNumbers": true,
    "includeSpecialChars": true,
    "excludeSimilar": true
  }'
```

## 6. Senha - E-commerce (Admin)

```bash
curl -X POST http://localhost:3000/api/v1/password/ecommerce \
  -H "Content-Type: application/json" \
  -d '{
    "type": "admin",
    "userRole": "super_admin",
    "customLength": 18
  }'
```

## 7. Senha - E-commerce (API Key)

```bash
curl -X POST http://localhost:3000/api/v1/password/ecommerce \
  -H "Content-Type: application/json" \
  -d '{
    "type": "api_key",
    "customLength": 32
  }'
```

## 8. Senha - Lote

```bash
curl -X POST http://localhost:3000/api/v1/password/batch \
  -H "Content-Type: application/json" \
  -d '{
    "count": 5,
    "type": "customer",
    "options": {
      "length": 12,
      "includeSpecialChars": false
    }
  }'
```

## 9. Teste de Rate Limiting

Execute este comando rapidamente várias vezes para testar o rate limiting:

```bash
for i in {1..110}; do
  echo "Request $i:"
  curl -s http://localhost:3000/api/v1/health | jq '.message'
done
```

## 10. Teste de Validação (Erro)

```bash
curl -X POST http://localhost:3000/api/v1/qrcode/generate \
  -H "Content-Type: application/json" \
  -d '{"text": ""}'
```

## 11. Usando PowerShell (Windows)

```powershell
# Health Check
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/health" -Method GET

# Gerar QR Code
$body = @{
    text = "https://meusite.com"
    options = @{
        width = 300
        margin = 2
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/qrcode/generate" -Method POST -Body $body -ContentType "application/json"

# Gerar Senha
$passwordBody = @{
    length = 16
    includeUppercase = $true
    includeLowercase = $true
    includeNumbers = $true
    includeSpecialChars = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/password/generate" -Method POST -Body $passwordBody -ContentType "application/json"
```
