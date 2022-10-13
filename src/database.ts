import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { HOST, DEV_DB, Alaa_USER, Alaa_PASSWORD, Alaa_TEST_DB, ENV } =
  process.env;
console.log(ENV,"ENV")
//database
//DEV_DB
//TEST
const Database =
  ENV === 'dev'
    ? new Pool({
        host: HOST,
        database: DEV_DB,
        user: Alaa_USER,
        password: Alaa_PASSWORD,
      })
    :
      new Pool({
        host: HOST,
        database: Alaa_TEST_DB,
        user: Alaa_USER,
        password: Alaa_PASSWORD,
      });
export default Database;
