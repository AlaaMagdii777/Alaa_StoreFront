import { Order } from '../models/orders';
import { OrderType } from '../types/types';
import { Application, Request, Response } from 'express';
import { verifyToken } from './users';

const orderInstance = new Order();

const createOrder = async (request: Request, response: Response) => {
  try {
    const orderData: OrderType = {
      user_id: request.params.id as unknown as number,
      order_status: request.body.order_status,
      products: request.body.products,
    };
    if (
      !orderData.products ||
      !orderData.order_status.match(/^(pending|fulfilled)$/)
    ) {
      response
        .status(500)
        .send('Please check the Product data & order_status are required');
      return;
    }
    const newOrder = await orderInstance.createOrder(orderData);
    response.json({ order: newOrder.products });
  } catch (err) {
    response.status(400).json({ message: err });
  }
};
const UserDoneOrders = async (request: Request, response: Response) => {
  try {
    const userId = request.params.id as unknown as number;
    const userOrders = await orderInstance.UserDoneOrders(userId);
    response.json({ userCompletedOrders: userOrders });
  } catch (err) {
    response.status(500).json({ message: err });
  }
};

const CurrentUserOrder = async (request: Request, response: Response) => {
  try {
    const userId = request.params.id as unknown as number;
    const userOrder = await orderInstance.CurrentUserOrder(userId);
    response.json({ userCurrentOrder: userOrder });
  } catch (err) {
    response.status(500).json({ message: err });
  }
};

const orderRouter = (app: Application) => {
  //REQUEST_CREATE_ORDER
  app.post('/orders/create/:id', verifyToken, createOrder);
  //REQUEST_USER_ORDER
  app.get('/orders/user/:id', verifyToken, CurrentUserOrder);
  //REQUEST_ORDER_COMPLETED
  app.get('/orders/user/completed/:id', verifyToken, UserDoneOrders);
};

export default orderRouter;
