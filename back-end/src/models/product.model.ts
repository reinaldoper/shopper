import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Product, Code } from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getValidation(product: Product[]): Promise<Product[]> {
    const productCodes = product.map((item) => item.product_code);
    const query = `SELECT code, sales_price, cost_price FROM shopper.products WHERE code IN (${productCodes.join(',')})`;
    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows as Product[];
  }

  public async validatePacket(product: number): Promise<Product[]> {
    const query = `SELECT * FROM shopper.packs WHERE pack_id = ${product}`;
    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows as Product[];
  }

  public async validate(product: number): Promise<Product[]> {
    const query = `
    SELECT pc.product_id, p.sales_price, pc.qty
    FROM shopper.packs pc
    JOIN shopper.products p ON pc.product_id = p.code
    WHERE pc.pack_id = ${product}`;
    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows as Product[];
  }

  public update = async (product: Product[]): Promise<Product[]> => {
    const updateQueries = product.map(async (product: any) => {
      const { product_code, new_price } = product;

      const query = `UPDATE shopper.products SET sales_price = ${new_price} WHERE code = ${product_code}`;
      const result = await this.connection.execute(query);
      return result;
    })
    const [rows] = updateQueries;
    return rows as unknown as Product[];
  }
}