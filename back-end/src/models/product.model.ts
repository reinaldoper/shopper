import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Product, Code } from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getValidation(product: number): Promise<Product[]> {
    const query = `SELECT * FROM shopper.products WHERE code = ${product}`;
    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows as Product[];
  }

  public update = async (product: Product[]): Promise<Product[]> => {
    const updateQueries = product.map(async (product: any) => {
      const { product_code, new_price } = product;
      const pack = `SELECT * FROM shopper.packs WHERE pack_id = ${Number(product_code)}`
      const results = await this.connection.execute(pack);
      const [rows] = results as unknown as Product[][];
      if(rows.length > 0) {
        const pack_valor = `SELECT sales_price FROM shopper.products WHERE code = ${Number(product_code)}`;
        const resul = await this.connection.execute(pack_valor);
        const [rowss] = resul as unknown as Product[][];
        const percent = 1 + ((Number(new_price) - Number(rowss[0].sales_price)) / Number(new_price));
        
        const percentNew = rows.map(async (r: any) => {
          await this.connection.execute(`UPDATE shopper.products SET sales_price = 
           ${percent} * sales_price WHERE code = ${r.product_id}`);
        });
        Promise.all(percentNew);
      }
      const query = `UPDATE shopper.products SET sales_price = ${Number(new_price)} WHERE code = ${Number(product_code)}`;
      const result = await this.connection.execute(query);
      return result;
    })
    const [rows] = updateQueries;
    return rows as unknown as Product[];
  }
}