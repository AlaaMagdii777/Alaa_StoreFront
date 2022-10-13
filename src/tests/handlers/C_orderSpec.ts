import server from '../../server';
import supertest, { Test, Response } from 'supertest';
import jwt from 'jsonwebtoken';

//SUPERTEST

const request: supertest.SuperTest<Test> = supertest(server);

const newUser={
    "userName": "alaa",
    "password": "Alaa1234",
    "firstName": "Alaa",
    "lastName": "Magdy"
}

//Token
const token = jwt.sign(newUser, process.env.PRIVATE_KEY as string);
    
describe('Fail tests', () => {

//COMPLETED_ORDERS  

    it('GET_ORDERS_COMPLED_WITH_ISSUE', async () => {
      const res: Response = await request.get('/orders/completed').expect(404);
    });
});