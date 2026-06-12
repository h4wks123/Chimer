import { Router } from "express";
import { pool } from "../config/psql-db";

const messageRouter = Router();

messageRouter.get("/", (req, res) => {
  const userId = req.query.userId;
  const senderId = req.query.senderId;

  if (!userId || !senderId) {
    return res.status(400);
  }

  const sql = `SELECT * FROM messages WHERE user_id = $1 AND sender_id = $2`;
  const values = [userId, senderId];

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
