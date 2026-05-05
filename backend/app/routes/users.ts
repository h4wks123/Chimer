import { Router } from "express";
import { pool } from "../config/psql-db";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  const sql = `SELECT * FROM users`;

  pool.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json(result);
  });
});

export default userRouter;
