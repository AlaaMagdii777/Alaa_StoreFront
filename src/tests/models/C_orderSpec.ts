//Models-Test_Order
import { Order } from '../../models/orders';
import { OrderProductsType } from '../../types/types';

const order = new Order();

const orderData=  {
    "user_id": 1,
    "order_status": "pending",
    "products": [
        {
            "product_id": 1,
            "quantity": 100
        }
    ]
}

//Models-Test_Order

describe('Models-Test_Order', () => {
    it('Models-Test_Order for CreateOrder', async () => {
      const result = {
        user_id: 1,
        order_status: 'fulfilled',
        products: [
          {
            product_id: 1,
            order_id:2,
            quantity: 250,
          },
        ],
      };
      const resultedOrder = await order.createOrder(result);
      expect(resultedOrder).toBeDefined();
      expect(resultedOrder).toBeInstanceOf(Object);
    });
  
    it('Models-Test_Order for UserDoneOrders method ToBe_Defined', () => {
        expect(order.UserDoneOrders).toBeDefined();
      });
      
    it('Models-Test_Order for UserDoneOrders', async () => {
      const result: OrderProductsType[] = await order.UserDoneOrders(1);
      expect(result).toBeInstanceOf(Array);
    });
});
  