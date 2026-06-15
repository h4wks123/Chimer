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
    logger.error(`Some of the request body are empty: ${userId} ${senderId}`);
    return res.status(400);
  }

  const sql = `
    SELECT u.user_name, (
            SELECT json_agg(
                json_build_object(
                    'id', m.id,
                    'user_id', m.user_id,
                    'sender_id', m.sender_id,
                    'message_text', m.message_text,
                    'message_created_at', m.message_created_at
                )
                ORDER BY m.message_created_at
            ) AS messages
            FROM messages m
            WHERE
                (m.user_id = $1 AND m.sender_id = $2)
                OR
                (m.user_id = $2 AND m.sender_id = $1)
        )
    FROM users u
    WHERE u.id = $2;
  `;

  const values = [userId, senderId];

  pool.query(sql, values, (err, result) => {
    if (err) {
      logger.error(`Failed to fetch message: ${err}`);
      return res.status(500).send(err);
    }

    res.status(200).json(result);
  });
});

messageRouter.post("/send", (req, res) => {
  const { userId, senderId, textMessage } = req.body;

  if (!userId || !senderId || !textMessage) {
    logger.error(
      `Some of the request body are empty: ${userId} ${senderId} ${textMessage}`,
    );
    return res.status(400);
  }

  const sql = `INSERT INTO messages (user_id, sender_id, message_text) VALUES ($1, $2, $3)`;
  const values = [userId, senderId, textMessage];

  pool.query(sql, values, (err, result) => {
    if (err) {
      logger.error(`Failed to send message: ${err}`);
      return res.status(500).send(err);
    }

    res.json(result);
  });

  res.status(201).json({
    success: true,
    message: "Message updated.",
  });
});

export default messageRouter;
