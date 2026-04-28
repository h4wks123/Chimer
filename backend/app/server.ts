import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";
import cors from "cors";

const app = express();
const port = 3000;
const corsOption = {
  origin: process.env.WEBSITE_URL,
  credentials: true,
};

app.use(cors(corsOption));

app.use("/api/auth", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

server.on("error", (err) => {
  console.error(`Server failed to start: ${err}`);
});
