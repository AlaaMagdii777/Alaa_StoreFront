import server from '../../server';
import supertest, { Test, Response } from 'supertest';
import jwt from 'jsonwebtoken';

//SUPERTEST

const request: supertest.SuperTest<Test> = supertest(server);

const newUser = {
  "userName": "alaa",
  "password": "Alaa1234",
  "firstName": "Alaa",
  "lastName": "Magdy"
}

//Token
const token = jwt.sign(newUser, process.env.PRIVATE_KEY as string);

describe('Fail_Tests', () => {

  //COMPLETED_ORDERS  

  it('GET_ORDERS_COMPLED_WITH_ISSUE', async () => {
    const res: Response = await request.get('/orders/completed').expect(404);
  });
});

// =======Fail_Tests
describe('Fail_Tests', () => {
  it('/alaaHamada', async () => {
    const res: Response = await request.get('/alaaHamada');
    expect(res.status).toBe(404);
  });


  it('Test_Metod_orders/alaaHamada NOTAUTHORIZED', async () => {
    const res: Response = await request.post('/orders/alaaHamada');
    expect(res.status).toBe(404);
  });

  it('Test_Metod_GET orderUsers with status 404', async () => {
    const res: Response = await request.get('/orders/users');
    expect(res.status).toBe(404);
  });

  it('Test_Metod_GET_orders_completed with status 404', async () => {
    const res: Response = await request.get('/orders/completed').expect(404);
  });
});

//Test_Handle_Router

describe('Test_Handle_Router', () => {
  it('Test_Handle_Router', async () => {
    const res: Response = await request.get('/');
    expect(res.status).toBe(200);
  });
});


//Token_Test
describe('Test_Token_OrderProduct', () => {
  it('Test_Method_GET_CURRENT', async () => {
    const res: Response = await request
      .get('/orders/user/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
  it('Test_Method_GET_ordersUser completed with status 200 successfully', async () => {
    const res: Response = await request
      .get('/orders/user/completed/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Test_Method_orders_Create ', async () => {
    const res: Response = await request
      .post('/orders/create/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        "order_status": "pending",
        "products": [
          {
            "product_id": 1,
            "quantity": 100
          }
        ],
      })
      .expect(200);
  });
});

