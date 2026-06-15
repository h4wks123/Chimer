import { Router } from "express";
import { pool } from "../config/psql-db";
import { pino } from "pino";

const messageRouter = Router();
const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

messageRouter.get("/", (req, res) => {
  const userId = req.query.userId;
  const senderId = req.query.senderId;

  if (!userId || !senderId) {
    return res.status(400);
  }

  const sql = `
    SELECT json_build_object(
        'sender_name', u.user_name,
        'messages', (
            SELECT json_agg(
                json_build_object(
                    'id', m.id,
                    'user_id', m.user_id,
                    'sender_id', m.sender_id,
                    'message_text', m.message_text,
                    'message_created_at', m.message_created_at
                )
                ORDER BY m.message_created_at
            )
            FROM messages m
            WHERE
                (m.user_id = $1 AND m.sender_id = $2)
                OR
                (m.user_id = $2 AND m.sender_id = $1)
        )
    )
    FROM users u
    WHERE u.id = $2;
  `;

  const values = [userId, senderId];

  pool.query(sql, values, (err, result) => {
    if (err) {
      logger.error(`Failed to send message: ${err}`);
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
