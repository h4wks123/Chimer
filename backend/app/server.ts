import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";
import cors from "cors";
import { WebSocket, WebSocketServer } from "ws";
import messageRouter, { sendMessage } from "./routes/messages.js";
import userRouter from "./routes/users.js";
import { pino } from "pino";
import { Message } from "./models/message.js";

const app = express();
const port = 3000;
const corsOption = {
  origin: process.env.WEBSITE_URL,
  credentials: true,
};

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

app.use(cors(corsOption));

app.use("/api/auth", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.use("/users", userRouter);
app.use("/messages", messageRouter);

const server = app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});

server.on("error", (err) => {
  logger.error(`Server failed to start: ${err}`);
});

const wss = new WebSocketServer({ server, path: "/" });

wss.on("connection", (ws, req) => {
  logger.info("Client connected securely!");

  ws.on("message", async (data) => {
    const message: Message = JSON.parse(data.toString());

    try {
      await sendMessage(message);

      const payload = JSON.stringify({
        type: "message:created",
        userId: message.userId,
        senderId: message.senderId,
      });

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(payload);
        }
      });
    } catch (err) {
      logger.error(`Failed to persist or broadcast message: ${err}`);
      ws.send(
        JSON.stringify({
          type: "message:error",
          error: "Unable to send message.",
        }),
      );
    }
  });
});
