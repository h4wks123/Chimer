import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email({
      message: "Email must have valid email format.",
    })
    .min(1, { message: "Email must not be empty." }),
  password: z.string().min(1, { message: "Password must not be empty." }),
});

export type SignInType = z.infer<typeof signInSchema>;