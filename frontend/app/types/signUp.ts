import { z } from "zod";

const initPasswordSchema = z
  .string()
  .min(8, "Password must at least be 8 characters long.")
  .max(20, { message: "Password must not be more than 20 characters long." })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must have uppercase characters.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must have lowercase characters.",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least a single digit.",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Password must contain a special character.",
  });

export const signUpSchema = z
  .object({
    email: z.email({
      message: "Email must have valid email format.",
    }),
    password: initPasswordSchema,
    confirmPassword: initPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof signUpSchema>;
