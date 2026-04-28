import express from "express";
import { db } from "./config/psql_db.ts";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT $1 AS value");
    console.log(result.json());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
