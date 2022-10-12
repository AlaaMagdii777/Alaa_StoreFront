import { Product } from './products';
import Database from '../database';
import { ProductNumberType, ProductsOrderType } from '../types/types';

export class ProductsOrder {
  //this-to-how-create-order-contains-products

  async createProductsOrder(
    orderId: number,
    products: ProductsOrderType[]
  ): Promise<ProductsOrderType[]> {
    try {
      const productsOrderArray: ProductsOrderType[] = [];
      const connection = await Database.connect();
      //Sql-query

      for (const product in products) {
        const productsOrder = await connection.query(
          'INSERT INTO products_order (product_id,order_id,quantity) VALUES ($1,$2,$3) RETURNING *',
          [products[product].product_id, orderId, products[product].quantity]
        );
        productsOrderArray.push(productsOrder.rows[0]);
      }
      connection.release();
      return productsOrderArray;
    } catch (err) {
      throw new Error(`Failed order the product ${err}`);
    }
  }

  async showOrderProducts(orderId: number): Promise<ProductNumberType[]> {
    try {
      const productWithoutQuantity = new Product();
      const QuantitiedProductsOfOrder: ProductNumberType[] = [];
      const connection = await Database.connect();

      const productsOrder = await connection.query(
        'SELECT product_id , quantity FROM products_order WHERE order_id=($1)',
        [orderId]
      );

      for (const product of productsOrder.rows) {
        QuantitiedProductsOfOrder.push({
          ...(await productWithoutQuantity.getProduct(product.product_id)),
          quantity: product.quantity,
        });
      }
      connection.release();

      return QuantitiedProductsOfOrder;
    } catch (err) {
      throw new Error(`Process Failed ${err}`);
    }
  }
}
