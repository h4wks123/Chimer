import express from "express";
import { Pool } from "./config/psql-db.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.ts";

const app = express();
const port = 3000;

app.all("/api/auth/*", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
