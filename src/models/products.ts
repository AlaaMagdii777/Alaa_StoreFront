import Database from '../database';
import { ProductType, ProductUpdatedType } from '../types/types';

export class Product {
  async createProduct(product: ProductType): Promise<ProductType> {
    try {
      const connection = await Database.connect();
      //Sql-query
      const result = await connection.query(
        'INSERT INTO products (product_name,category,price) VALUES($1,$2,$3) RETURNING *',
        [product.product_name, product.category, product.price]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`try again!.. product can't created ${err}`);
    }
  }

  async updateProduct(
    id: number,
    product: ProductUpdatedType
  ): Promise<ProductType> {
    try {
      const connection = await Database.connect();

      const result = await connection.query(
        'UPDATE products SET product_name = $2, category = $3, price = $4  WHERE id = $1 RETURNING *',
        [id, product.product_name, product.category, product.price]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`This Product can't be updated ${err}`);
    }
  }

  async index(): Promise<ProductType[]> {
    try {
      const connection = await Database.connect();
      const sqlQuery = 'SELECT * FROM products';
      const result = await connection.query(sqlQuery);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Products Not Found ${err}`);
    }
  }

  async getProduct(id: number): Promise<ProductType> {
    try {
      const connection = await Database.connect();
      const result = await connection.query(
        'SELECT * FROM products WHERE id=($1)',
        [id]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`There's no Product with this id ${err}`);
    }
  }

  async getProductsInCategory(category: string): Promise<ProductType[]> {
    try {
      const connection = await Database.connect();
      const result = await connection.query(
        'SELECT * FROM products WHERE category=($1)',
        [category]
      );
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`No Products in this Category ${err}`);
    }
  }

  async deleteProduct(id: number): Promise<ProductType> {
    try {
      const connection = await Database.connect();
      const result = await connection.query(
        'DELETE FROM products WHERE id=($1) RETURNING *',
        [id]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`This Product can't be deleted ${err}`);
    }
  }
}
