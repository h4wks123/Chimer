import { z } from "zod";

export const textInputSchema = z.object({
  userId: z.string(),
  senderId: z.string(),
  input: z.string().min(1, "Text input must not be empty"),
});

export type TextInputType = z.infer<typeof textInputSchema>;
