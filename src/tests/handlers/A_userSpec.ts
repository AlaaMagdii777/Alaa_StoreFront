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

describe('User_Handler', () => {

//CREATE_USER
    it('CREATE_USER', async () => {
        const response: Response = await request
          .post('/users')
          .type('form')
          .send({
            userName: 'alaa',
            password: 'Alaa1234',
            firstName: 'Alaa',
            lastName: 'Magdy',
          })
          .expect(200);
      });

//LOGIN
   it('Login', async () => {
    const response: Response = await request
      .post('/users/login')
      .send({
        userName: 'alaa',
        password: 'Alaa1234',
      })
      .expect(200);
  });
  
//GET_USERS

 it('GET_USERS', async () => {
    const response: Response = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });     


//UPDATE_USERS
it('UPDATE_USER_ONE', async () => {
    const response: Response = await request
      .put('/users/1')
      .set('Authorization', 'Bearer ' + token)
      .send({
        userName: 'AlaaUdacity',
        password: 'Alaa1234',
        firstName: 'Alaa',
        lastName: 'Magdy',
      });
    expect(response.status).toBe(200);
  });
});
