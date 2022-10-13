//Models-Test_Order
import { Order } from '../../models/orders';
import { OrderProductsType } from '../../types/types';

const order = new Order();

//Models-Test_Order

describe('Models-Test_Order', () => {
    it('Models-Test_Order for CreateOrder', async () => {
        const result = {
            user_id: 1,
            order_status: 'fulfilled',
            products: [
                {
                    product_id: 1,
                    order_id: 2,
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

    //Make_Sure_About_Methods

    it('UserDoneOrders method toBeDefined', () => {
        expect(order.UserDoneOrders).toBeDefined();
    });
    it('createOrder method test in toBeDefined', () => {
        expect(order.createOrder).toBeDefined();
    });

    it('CurrentUserOrder method toBeDefined', () => {
        expect(order.CurrentUserOrder).toBeDefined();
    });

    it('Test for CurrentUserOrder method urrentUser_orders', async () => {
        const result: OrderProductsType = await order.CurrentUserOrder(1);
        expect(result).toBeInstanceOf(Object);
    });

});
