import { Router } from "express";
import { pool } from "../config/psql-db";
import { pino } from "pino";

const userRouter = Router();
const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

userRouter.get("/", (req, res) => {
  const userId = req.query.userId;
  logger.info(`Fetch all user information except for: ${userId}`);

  const sql = `SELECT * FROM users WHERE id != $1`;

  const values = [userId];

  pool.query(sql, values, (err, result) => {
    if (err) {
      logger.error(`Failed to fetch information for user: ${userId}`);
      return res.status(500).send(err);
    }

    logger.info(`Successfully fetched information from user: ${userId}`);
    res.status(200).json(result);
  });
});

export default userRouter;
