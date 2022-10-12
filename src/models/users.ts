import Database from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserType, UserUpdatedType } from '../types/types';

dotenv.config();
const { Alaa_PASSWORD_PEPPER, SALT } = process.env;

export class User {
  async createUser(user: UserType): Promise<UserType> {
    try {
      const connection = await Database.connect();
      //Sql-query
      const passwordHashed = bcrypt.hashSync(
        user.password + Alaa_PASSWORD_PEPPER,
        parseInt(SALT as string)
      );
      const result = await connection.query(
        'INSERT INTO users (userName,password,firstName,lastName) VALUES($1,$2,$3,$4) RETURNING *',
        [user.userName, passwordHashed, user.firstName, user.lastName]
      );

      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`User cannot be created ${err}`);
    }
  }

  async updateUser(id: number, user: UserUpdatedType): Promise<UserType> {
    try {
      const connection = await Database.connect();
      const result = await connection.query(
        'UPDATE users SET userName = $2, firstName = $3, lastName = $4 WHERE id = $1 RETURNING *',
        [id, user.userName, user.firstName, user.lastName]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't update this user => ${err}`);
    }
  }
  async index(): Promise<UserType[]> {
    try {
      const connection = await Database.connect();
      const result = await connection.query(
        'SELECT id, userName, firstName,lastName FROM users'
      );
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`We can't get users ${err}`);
    }
  }

  async getUser(id: number): Promise<UserType> {
    try {
      const connection = await Database.connect();
      const result = await connection.query(
        'SELECT id, userName, firstName, lastName FROM users WHERE id =($1)',
        [id]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't get the user with ${id} id ${err}`);
    }
  }

  async login(username: string, password: string): Promise<UserType | null> {
    try {
      const connection = await Database.connect();
      const result = await connection.query(
        'SELECT * FROM users WHERE userName=($1)',
        [username]
      );
      if (result.rows.length) {
        const user: UserType = result.rows[0];
        if (
          bcrypt.compareSync(password + Alaa_PASSWORD_PEPPER, user.password)
        ) {
          return user;
        }
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error(`Login Failed for this user ${username} => ${err}`);
    }
  }
}

// ===================================================
// import Database from '../database';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
// import { UserType, UserUpdatedType } from '../types/types';

// dotenv.config();
// const { Alaa_PASSWORD_PEPPER, SALT } = process.env;

// export class User {
//   async createUser(user: UserType): Promise<UserType> {
//     try {
//       const connection = await Database.connect();

//       const sqlQuery =
//         'INSERT INTO users (user_name,password,first_name,last_name) VALUES($1,$2,$3,$4) RETURNING *';
//       const passwordHashed = bcrypt.hashSync(
//         user.password + Alaa_PASSWORD_PEPPER,
//         parseInt(SALT as string)
//       );
//       const result = await connection.query(sqlQuery, [
//         user.userName,
//         passwordHashed,
//         user.firstName,
//         user.lastName,
//       ]);

//       connection.release();
//       return result.rows[0];
//     } catch (err) {
//       throw new Error(`User cannot be created ${err}`);
//     }
//   }

//   async updateUser(id: number, user: UserUpdatedType): Promise<UserType> {
//     try {
//       const connection = await Database.connect();
//       const sqlQuery =
//         'UPDATE users SET user_name = $2, first_name = $3, last_name = $4 WHERE id = $1 RETURNING *';
//       const result = await connection.query(sqlQuery, [
//         id,
//         user.userName,
//         user.firstName,
//         user.lastName,
//       ]);
//       connection.release();
//       return result.rows[0];
//     } catch (err) {
//       throw new Error(`Couldn't update this user => ${err}`);
//     }
//   }
//   async index(): Promise<UserType[]> {
//     try {
//       const connection = await Database.connect();
//       const sqlQuery = 'SELECT id, user_name, first_name,last_name FROM users';
//       const result = await connection.query(sqlQuery);
//       connection.release();
//       return result.rows;
//     } catch (err) {
//       throw new Error(`We can't get users ${err}`);
//     }
//   }

//   async getUser(id: number): Promise<UserType> {
//     try {
//       const connection = await Database.connect();
//       const sqlQuery =
//         'SELECT id, user_name, first_name, last_name FROM users WHERE id =($1)';
//       const result = await connection.query(sqlQuery, [id]);
//       connection.release();
//       return result.rows[0];
//     } catch (err) {
//       throw new Error(`Can't get the user with ${id} id ${err}`);
//     }
//   }

//   async login(username: string, password: string): Promise<UserType | null> {
//     try {
//       const connection = await Database.connect();
//       const sqlQuery = 'SELECT * FROM users WHERE user_name=($1)';
//       const result = await connection.query(sqlQuery, [username]);
//       if (result.rows.length) {
//         const user: UserType = result.rows[0];
//         if (bcrypt.compareSync(password + Alaa_PASSWORD_PEPPER, user.password)) {
//           return user;
//         }
//       }
//       connection.release();
//       return null;
//     } catch (err) {
//       throw new Error(`Login Failed for this user ${username} => ${err}`);
//     }
//   }
// }
