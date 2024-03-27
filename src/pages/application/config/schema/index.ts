import { z } from "zod";

export const vehicleSchema = z.object({
  model: z.number().min(1),
  plate: z.string().min(8),
  manufacture_year: z.string().length(4),
  vin: z.string().or(z.null()),
  body: z.string().or(z.null()),
});
