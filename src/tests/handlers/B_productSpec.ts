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

//CREATE_Product
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

  //Test_UPDATE_PRODUCT

  describe('Test_UPDATE_PRODUCT', () => {
    it('Test_UPDATE_PRODUCT /products/update/1 unauthorized', async () => {
      const res: Response = await request
        .put('/products/update/1')
        .set('Authorization', 'Bearer ' + token)
        .send({
            product_name: 'bags',
          category: 'clothes',
          price: 2000,
        })
        .expect(200);
    });
  });

//GET_PRODUCT_BY_ID

describe('GET_PRODUCT_BY_ID', () => {
    it('GET_PRODUCT_BY_ID', async () => {
        const res: Response = await request.get('/products/1');
        expect(res.status).toBe(200);
    });
});

//Test_DELETE_PRODUCT

  describe('Test_DELETE_PRODUCT', () => {
    it('DELETE /products/1 unauthorized', async () => {
      const res: Response = await request
        .delete('/products/3')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });



  describe('TEST SUCCESS', () => {
    //test for SUCCESS

    it('Test_Method_index_GET_Product', async () => {
      const res: Response = await request.get('/products');
      expect(res.status).toBe(200);
    });
    it('Test_Method_index_GET_Product_By_ID', async () => {
      const res: Response = await request.get('/products/1');
      expect(res.status).toBe(200);
    });
    it('Test_Method_index_GET_Product_Category', async () => {
      const res: Response = await request.get('/products/category/shoeRoom');
      expect(res.status).toBe(200);
    });
  });

  //Status_404

  describe('Test_Status_404_NOT_FOUND_URL', () => {
    it('/alaaHamada', async () => {
      const res: Response = await request.get('/alaaHamada');
      expect(res.status).toBe(404);
    });
  });

  //Test_Base_URL

  describe('Test_Base_URL', () => {
    it('Test_Base_URL', async () => {
      const res: Response = await request.get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('Test_Method_GET_products', () => {
    it('Test_Method_GET_Category_products 404', async () => {
      const res: Response = await request.get('/product/category/alaaHamada');
      expect(res.status).toBe(404);
    });
    it('Test_Method_GET_products 404', async () => {
      const res: Response = await request.get('/product');
      expect(res.status).toBe(404);
    });
  });
