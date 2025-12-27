import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({
    message: "Email must have valid email format.",
  }),
  password: z
    .string()
    .min(8, "Password must at least be 8 characters long.")
    .regex(/\d/, "Password must contain at least one number"),
});

export type SignInType = z.infer<typeof signInSchema>;
