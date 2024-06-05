import { z } from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    image: z.optional(z.string()),
    email: z.optional(z.string()),
  })
