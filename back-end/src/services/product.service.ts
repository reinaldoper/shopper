import connection from '../models/connection';
import ProductModel from '../models/product.model';
import { Product } from '../interfaces/product.interface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public getValidation = async (product: Product[]): Promise<Product[]> => {
    return await this.model.getValidation(product);
  }

  public getPacket = async (product: number): Promise<Product[]> => {
    const products = await this.model.validatePacket(product);
    return products;
  }
  public async getValidate(product: number): Promise<Product[]> {
    const products = await this.model.validate(product);
    return products;
  }

  public update = async (product: Product[]): Promise<Product[]> => {
    const products = await this.model.update(product);
    const packet = await Promise.all(products);
    return packet;
  };
}

export default ProductService;