import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import ProductService from '../services/product.service';

class ProductController {

  constructor(private productService = new ProductService()) { }

  public getValidation = async (req: Request, res: Response) => {
    const updates = req.body;
    const productCodes = updates.map((item: any) => item.product_code);
    const productCreated = await this.productService.getValidation(updates);
    const existingProducts: { [key: number]: { sales_price: number; cost_price: number } } = {};
    productCreated.forEach((row: any) => {
      existingProducts[row.code] = {
        sales_price: row.sales_price,
        cost_price: row.cost_price,
      };
    });
    const invalidCodes = productCodes.filter((code: any) => !existingProducts[code]);

    if (invalidCodes.length > 0) {
      return res.status(400).json({ error: `Códigos de produto inválidos: ${invalidCodes.join(', ')}` });
    }
    try {
      await Promise.all(
        updates.map(async (product: any) => {
          const { product_code, new_price } = product;
  
          // Verifica se o produto é um pacote
          const isPackageQuery = await this.productService.getPacket(product_code)
  
          if (isPackageQuery.length > 0) {
            // Produto é um pacote
            const componentResult = await this.productService.getValidate(product_code);
  
            if (componentResult.length > 0) {
              // Calcula o novo preço do componente com base no preço do pacote
              const componentPrice = new_price / componentResult[0].qty;
  
              // Verifica se o novo preço do componente respeita a regra de atualização de preço do pacote
              const isPriceValid = Math.abs(componentPrice - componentResult[0].sales_price) < 0.01;
  
              if (!isPriceValid) {
                return res.status(statusCodes.NOT_FOUND).json({ product_code, validation: 'Regra de atualização de preço do pacote violada' })
              }
            }
          }
        })
      ); 
      return res.status(statusCodes.OK).json([]);
    } catch (error) {
      return res.status(500).json({ error: error});
    }

    };
    public update = async (req: Request, res: Response) => {
      const products = req.body;
      try {
        await this.productService.update(products);
    
        return res.status(statusCodes.OK).json({ message: 'Preços atualizados com sucesso.' });
      } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar os preços.' });
      }
    }
  }

export default ProductController;
