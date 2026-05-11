import { Router } from "express";
import { pool } from "../config/psql-db";

const chatRouter = Router();

chatRouter.get("/:id", (req, res) => {
  const userID = req.params;

  if (!userID) {
    return res.status(400);
  }

  const sql = `SELECT * FROM chats WHERE id = $1`;
  const values = [userID];

  pool.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(201).json(result);
  });
});

export default chatRouter;
