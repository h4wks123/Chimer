import { Router } from "express";
import { pool } from "../config/psql-db";
import { pino } from "pino";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../models/message";
import { Filter } from "bad-words";

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
  logger.info(`Fetch messages between user: ${userId} and sender: ${senderId}`);

  if (!userId || !senderId) {
    logger.error(`Some of the request body are empty: ${userId} ${senderId}`);
    return res.status(400);
  }

  const sql = `
    SELECT u.id, u.user_name, (
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

export default messageRouter;

export async function sendMessage(message: Message) {
  logger.info(`Received message from sender id: ${message.senderId}`);
  const uuid = uuidv4();
  const filter = new Filter();

  if (!message.userId || !message.senderId || !message.input) {
    logger.error(
      `Some of the message request body is empty: ${message.userId} ${message.senderId} ${message.input}`,
    );
  }

  message.input = filter.clean(message.input);

  const sql = `INSERT INTO messages (id, user_id, sender_id, message_text) VALUES ($1, $2, $3, $4)`;
  const values = [uuid, message.userId, message.senderId, message.input];

  try {
    await pool.query(sql, values);
  } catch (err) {
    logger.error(`Failed to send message: ${err}`);
    throw err;
  }
}
