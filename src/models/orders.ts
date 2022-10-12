import Client from '../database';
import { ProductsOrder } from './productOrder';
import { OrderProductsType, OrderType } from '../types/types';

const newOrderProducts = new ProductsOrder();
export class Order {
  async createOrder(order: OrderType): Promise<OrderType> {
    try {
      const conn = await Client.connect();
      //Sql-query
      const result = await conn.query(
        'INSERT INTO orders (user_id,order_status) VALUES ($1, $2) RETURNING *',
        [order.user_id, order.order_status]
      );
      //steps
      conn.release();
      const createdOrder = result.rows[0];
      //return createdOrder;
      const orderProductsArray = await newOrderProducts.createProductsOrder(
        createdOrder.id,
        order.products
      );

      //we add product-with-orders
      return { ...createdOrder, products: orderProductsArray };
    } catch (err) {
      throw new Error(`try again !! , order not created ${err}`);
    }
  }

  async UserDoneOrders(id: number): Promise<OrderProductsType[]> {
    try {
      const connection = await Client.connect();
      //Sql-query
      const sqlQuery =
        'SELECT * FROM orders WHERE user_id=($2) AND order_status=($1)';
      const fulfilledOrders = await connection.query(sqlQuery, [
        'fulfilled',
        id,
      ]);

      if (fulfilledOrders.rows.length) {
        const userfulfilledOrders: OrderProductsType[] = [];
        for (const fulfilledOrder of fulfilledOrders.rows) {
          const orderProducts = await newOrderProducts.showOrderProducts(
            fulfilledOrder.id
          );
          userfulfilledOrders.push({
            ...fulfilledOrder,
            products: orderProducts,
          });
        }
        connection.release();
        return userfulfilledOrders;
      }
      return [];
    } catch (err) {
      throw new Error(`Orders Not fulfilled ${err}`);
    }
  }

  async getUserPendingOrders(id: number): Promise<OrderProductsType[]> {
    try {
      const connection = await Client.connect();
      const sqlQuery =
        'SELECT * FROM orders WHERE user_id=($2) AND order_status=($1)';
      const pendingOrders = await connection.query(sqlQuery, ['pending', id]);
      if (pendingOrders.rows.length) {
        const userPendingOrders: OrderProductsType[] = [];
        for (const pendingOrder of pendingOrders.rows) {
          const orderProducts = await newOrderProducts.showOrderProducts(
            pendingOrder.id
          );
          userPendingOrders.push({
            ...pendingOrder,
            products: orderProducts,
          });
        }
        connection.release();
        return userPendingOrders;
      }
      return [];
    } catch (err) {
      throw new Error(`the orders didn't fulfilled ${err}`);
    }
  }

  async CurrentUserOrder(userId: number): Promise<OrderProductsType> {
    try {
      const connection = await Client.connect();
      const sqlQuery = 'SELECT * FROM orders WHERE user_id=($1)';
      const allUserOrders = await connection.query(sqlQuery, [userId]);
      connection.release();
      const currentUserOrder = allUserOrders.rows[0];
      const orderProducts = await newOrderProducts.showOrderProducts(
        currentUserOrder.id
      );
      return { ...currentUserOrder, orderProducts };
    } catch (err) {
      throw new Error(`Order can't be back ${err}`);
    }
  }
}
