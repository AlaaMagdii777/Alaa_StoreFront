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

describe('CREATE_PRODUCT', () => {
    it('CREATE_PRODUCT_UNUTHORIZED', async () => {
        const res: Response = await request
            .post('/products/create')
            .type('form')
            .send({
                name: 'Shoes',
                category: 'shoeRoom',
                price: 1000,
            })
    });
});

describe('GET_PRODUCT_BY_ID', () => {
    it('GET_PRODUCT_BY_ID', async () => {
        const res: Response = await request.get('/products/1');
        expect(res.status).toBe(200);
    });
});