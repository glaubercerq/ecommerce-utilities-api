import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

/**
 * Gera um QR Code genérico
 */
export const generateQRCode = async (req, res) => {
  try {
    const { text, options = {} } = req.body;

    const defaultOptions = {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    };

    const qrOptions = { ...defaultOptions, ...options };
    
    // Gera o QR Code como Data URL (base64)
    const qrCodeDataURL = await QRCode.toDataURL(text, qrOptions);
    
    // Gera também em formato SVG para flexibilidade
    const qrCodeSVG = await QRCode.toString(text, { 
      ...qrOptions, 
      type: 'svg' 
    });

    const response = {
      success: true,
      message: 'QR Code gerado com sucesso',
      data: {
        id: uuidv4(),
        text,
        qrCode: {
          dataURL: qrCodeDataURL,
          svg: qrCodeSVG
        },
        options: qrOptions,
        generatedAt: new Date().toISOString()
      }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao gerar QR Code',
      error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_ERROR'
    });
  }
};

/**
 * Gera um QR Code específico para produtos de e-commerce
 */
export const generateProductQRCode = async (req, res) => {
  try {
    const { 
      productId, 
      productName, 
      price, 
      category, 
      storeUrl,
      description = '',
      imageUrl = '',
      options = {}
    } = req.body;

    // Validação básica
    if (!productId || !productName || !storeUrl) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios: productId, productName, storeUrl',
        error: 'MISSING_REQUIRED_FIELDS'
      });
    }

    // Constrói a URL do produto
    const productUrl = `${storeUrl}/produto/${productId}`;
    
    // Metadados do produto para o QR Code
    const productData = {
      id: productId,
      name: productName,
      price: price || null,
      category: category || null,
      description,
      imageUrl,
      url: productUrl,
      generatedAt: new Date().toISOString()
    };

    const defaultOptions = {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H' // High para produtos (mais dados)
    };

    const qrOptions = { ...defaultOptions, ...options };
    
    // Gera QR Code com URL do produto
    const qrCodeDataURL = await QRCode.toDataURL(productUrl, qrOptions);
    const qrCodeSVG = await QRCode.toString(productUrl, { 
      ...qrOptions, 
      type: 'svg' 
    });

    const response = {
      success: true,
      message: 'QR Code do produto gerado com sucesso',
      data: {
        id: uuidv4(),
        product: productData,
        qrCode: {
          dataURL: qrCodeDataURL,
          svg: qrCodeSVG
        },
        options: qrOptions,
        generatedAt: new Date().toISOString()
      }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao gerar QR Code do produto',
      error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_ERROR'
    });
  }
};

/**
 * Gera múltiplos QR Codes em lote
 */
export const generateBatchQRCodes = async (req, res) => {
  try {
    const { items, options = {} } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Campo items deve ser um array não vazio',
        error: 'INVALID_ITEMS_ARRAY'
      });
    }

    if (items.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Máximo de 50 itens por lote',
        error: 'BATCH_SIZE_EXCEEDED'
      });
    }

    const defaultOptions = {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    };

    const qrOptions = { ...defaultOptions, ...options };
    
    const results = [];
    const errors = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const item = items[i];
        const text = item.text || item.url || item.data;
        
        if (!text) {
          errors.push({
            index: i,
            item,
            error: 'Campo text/url/data é obrigatório'
          });
          continue;
        }

        const qrCodeDataURL = await QRCode.toDataURL(text, qrOptions);
        
        results.push({
          id: uuidv4(),
          index: i,
          originalData: item,
          text,
          qrCode: {
            dataURL: qrCodeDataURL
          },
          generatedAt: new Date().toISOString()
        });
      } catch (error) {
        errors.push({
          index: i,
          item: items[i],
          error: error.message
        });
      }
    }

    const response = {
      success: true,
      message: `Lote processado: ${results.length} QR Codes gerados, ${errors.length} erros`,
      data: {
        batchId: uuidv4(),
        totalItems: items.length,
        successCount: results.length,
        errorCount: errors.length,
        results,
        errors: errors.length > 0 ? errors : undefined,
        options: qrOptions,
        generatedAt: new Date().toISOString()
      }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao gerar lote de QR Codes',
      error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_ERROR'
    });
  }
};
