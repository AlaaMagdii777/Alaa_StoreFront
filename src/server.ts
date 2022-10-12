//Alaa-server
import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
//Handlers
import userRouter from './handlers/users';
import productRouter from './handlers/products';
import orderRouter from './handlers/orders';

dotenv.config();

const SERVER_PORT = (process.env.SERVER_PORT as unknown as number) || 3000;

const server: Application = express();
//body-server
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(morgan('dev'));
userRouter(server);
productRouter(server);
orderRouter(server);

const address = '0.0.0.0:3000';
//===baseURL
server.get('/', (request: Request, response: Response): void => {
  response.send(
    `<h1> Hello Alaa Magdi, Welcome to you in your Application for Storefront  ${address} </h1>
        `
  );
});

//Error Middleware=for --status--500

server.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: Function
  ): void => {
    response.status(500).json({ Errors: error.stack });
  }
);

//Error Middleware for --status--404

server.use((request: Request, response: Response): void => {
  response.status(404).json({ Message: '404 NOT FOUND!!' });
});

server.listen(3000, function () {
  console.log(`The server is running in Port ${SERVER_PORT}`);
});

export default server;
