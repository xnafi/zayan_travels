import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(160),
  content: z.string().min(1, "Content is required"),
  icon: z.string().nullable().default("Plane"),
  imageUrl: z.string().url("Invalid image URL").nullable().default(null),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export type ServiceInput = z.infer<typeof serviceSchema>;