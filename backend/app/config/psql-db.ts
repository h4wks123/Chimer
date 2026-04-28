import pgPromise from "pg-promise";
import "dotenv/config";

const pgp = pgPromise();

export const Pool = pgp({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
});
