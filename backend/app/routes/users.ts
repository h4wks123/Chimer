import { Router } from "express";
import { pool } from "../config/psql-db";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  const userId = req.query.userId;

  const sql = `SELECT * FROM users WHERE id != $1`;

  const values = [userId];

  pool.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).json(result);
  });
});

export default userRouter;
