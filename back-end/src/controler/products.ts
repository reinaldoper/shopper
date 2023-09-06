import { Product } from './../interfaces/product.interface';
import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import ProductService from '../services/product.service';
import { TObj, TMessage } from '../interfaces/product.interface';

class ProductController {

  constructor(private productService = new ProductService()) { }

  public getValidation = async (req: Request, res: Response) => {
    const updates = req.body;
    
    console.log(updates);
    
    
    try {
      const result = updates.map(async (item: Product) => {
        const obj: TObj = {"new_price": item.new_price, "code": item.product_code, "message": "Produto validado!", "name": item.name, "actual_price": 0};
        if (!item.product_code || !item.new_price) {
          obj["message"] = "Campos inválidos!";
        } else if (isNaN(item.new_price) || isNaN(item.product_code)) {
          obj["message"] = "Código ou novo preço inválido!";
        } else {
          const product = await this.productService.getValidation(Number(item.product_code));
          if (product.length === 0) {
            obj["message"] = "Código não existente!";
          } else {
            obj["name"] = product[0].name;
            obj["actual_price"] = product[0].sales_price;
            const diferences = Math.abs(Number(item.new_price) - product[0].sales_price);
            if (diferences / product[0].sales_price > 0.1) {
              obj["message"] = "Novo preço > ou < que 10% do preço atual!";
            } else if (Number(item.new_price) < product[0].cost_price) {
              obj["message"] = "Preço menor que o preço de custo!";
            }
          }
        }
        return obj;
      });
      const promiseeAll: TObj[] = await Promise.all(result);
      if (promiseeAll.some((i: TObj) => i.message !== "Produto validado!")) {
        return res.status(statusCodes.BAD_REQUEST).json({ type: false, message: promiseeAll});
      } else {
        return res.status(statusCodes.OK).json({ type: true, message: promiseeAll});
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao validar dados.' });
    }
    
  };

  public update = async (req: Request, res: Response) => {
    const products = req.body;
    console.log(products);
    
    try {
      await this.productService.update(products);

      return res.status(statusCodes.OK).json({ message: 'Preços atualizados com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao validar dados.' });
    }
  }
}

export default ProductController;
