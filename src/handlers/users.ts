import { User } from '../models/users';
import { UserType, UserUpdatedType } from '../types/types';
import jwt, { Secret } from 'jsonwebtoken';
import { Application, Request, Response, NextFunction } from 'express';

const userInstance = new User();
const privateKey = process.env.PRIVATE_KEY as Secret;

const createUser = async (request: Request, response: Response) => {
  try {
    const userData: UserType = {
      userName: request.body.userName,
      password: request.body.password,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
    };
    if (
      !userData.userName ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName
    ) {
      response
        .status(400)
        .send(
          'BAD REQUEST... Username, userPassword firstName , lastName are required'
        );
      return;
    }
    const newUser: UserType = await userInstance.createUser(userData);
    const token = jwt.sign({ user: newUser }, privateKey);
    response.json({ user: newUser, token: token });
  } catch (err) {
    response.status(400).json({ message: err });
  }
};

const updateUser = async (request: Request, response: Response) => {
  try {
    const id = request.params.id as unknown as number;
    if (!id) {
      response.status(400).send('Please write user_id you want updated');
      return;
    }
    const userData: UserUpdatedType = {
      userName: request.body.userName,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
    };
    if (!userData.firstName || !userData.lastName || !userData.userName) {
      response
        .status(400)
        .send('bad request!. the Username & firstName & lastName are required');
      return;
    }
    const updatedUser: UserUpdatedType = await userInstance.updateUser(
      id,
      userData
    );
    response.json({ user: updatedUser });
  } catch (err) {
    response.status(400);
    response.json({ message: err });
  }
};

const index = async (request: Request, response: Response) => {
  try {
    const users: UserType[] = await userInstance.index();
    response.json(users);
  } catch (err) {
    response.status(401).json({ message: err });
  }
};

const getUser = async (request: Request, response: Response) => {
  try {
    const id = request.params.id as unknown as number;
    const user: UserType = await userInstance.getUser(id);
    response.json(user);
  } catch (err) {
    response.status(401).json({ message: err });
  }
};

const login = async (request: Request, response: Response) => {
  try {
    const userName = request.body.userName;
    const password = request.body.password;
    if (!userName || !password) {
      response
        .status(400)
        .send('bad request!. the Username and userPassword are required!');
      return;
    }
    const signedInUser: UserType | null = await userInstance.login(
      userName,
      password
    );
    if (!signedInUser) {
      response.status(401);
      response.send('!Wrong Username or userPassword not authorized');
    }
    const token = jwt.sign({ user: signedInUser }, privateKey);
    response.json(token);
  } catch (err) {
    response.status(404).json({ message: err });
  }
};

export const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const bearer = request.headers.authorization as unknown as string;
    const jwtToken = bearer.split(' ')[1];
    const decodedToken = jwt.verify(jwtToken, privateKey);
    response.locals.auth = decodedToken;
    next();
  } catch (error) {
    response.status(401).send('The User NOT Authorized');
  }
};

const userRouter = (app: Application) => {
  //REQUEST_CREATE_USER
  app.post('/users', createUser);
  //REQUEST_GET_USER_BY_ID
  app.get('/users/:id', verifyToken, getUser);
  //REQUEST_USER_LOGIN
  app.post('/users/login', login);
  //REQUEST_UPDATE_USER
  app.put('/users/:id', verifyToken, updateUser);
  //REQUEST_GET_USER
  app.get('/users', verifyToken, index);
};

export default userRouter;
