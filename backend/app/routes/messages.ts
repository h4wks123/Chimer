import { Router } from "express";
import { pool } from "../config/psql-db";

const messageRouter = Router();

messageRouter.get("/:id", (req, res) => {
  const chatID = req.params;

  if (!chatID) {
    return res.status(400);
  }

  const sql = `SELECT * FROM messages WHERE id = $id`;
  const values = [chatID];

  pool.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(201).json(result);
  });
});

messageRouter.post("/send-text", (req, res) => {
  const { user, text } = req.body;

  if (!text) {
    return res.status(400);
  }

  const sql = `SELECT * FROM messages WHERE `;

  pool.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json(result);
  });

  res.status(201).json({
    success: true,
    message: "Message received.",
  });
});

export default messageRouter;
