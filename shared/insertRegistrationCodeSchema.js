import { z } from "zod";

export const insertRegistrationCodeSchema = z.object({
  code: z.string().min(1),
  appType: z.string().min(1),
  createdBy: z.string().uuid(),
  expiresAt: z.date().nullable().optional(),
});
