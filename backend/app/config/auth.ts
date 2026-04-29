import { betterAuth } from "better-auth";
import { pool } from "./psql-db.js";

export const auth = betterAuth({
  database: pool,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.WEBSITE_URL as string],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "users",
    fields: {
      name: "user_name",
      email: "user_email",
      emailVerified: "user_email_verified",
      image: "user_profile",
      createdAt: "user_created_at",
      updatedAt: "user_updated_at",
    },
  },
  session: {
    modelName: "sessions",
    fields: {
      expiresAt: "session_expires_at",
      token: "session_token",
      createdAt: "session_created_at",
      updatedAt: "session_updated_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      userId: "user_id",
    },
  },
  account: {
    modelName: "accounts",
    fields: {
      createdAt: "account_created_at",
      updatedAt: "account_uploaded_at",
      providerId: "account_provider_id",
      accountId: "account_secondary_id",
      userId: "user_id",
      accessToken: "account_access_token",
      refreshToken: "account_refresh_token",
      idToken: "account_id_token",
      accessTokenExpiresAt: "account_access_token_expires_at",
      refreshTokenExpiresAt: "account_refresh_token_expires_at",
      scope: "account_scope",
      password: "account_password",
    },
  },
  verification: {
    modelName: "verifications",
    fields: {
      createdAt: "verification_created_at",
      updatedAt: "verification_updated_at",
      value: "verification_value",
      expiresAt: "verification_expires_at",
      identifier: "verification_identifier",
    },
  },
});
