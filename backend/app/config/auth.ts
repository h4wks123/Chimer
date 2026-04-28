import { betterAuth } from "better-auth";
import { Pool } from "./psql-db.js";

export const auth = betterAuth({
  database: Pool,
  emailAndPassword: {
    enabled: true,
  },
});
