import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL"),
  GOOGLE_PLACES_API_KEY: z.string().min(1, "GOOGLE_PLACES_API_KEY is required"),
  GOOGLE_PLACE_ID: z.string().min(1, "GOOGLE_PLACE_ID is required"),
  UPLOADTHING_SECRET: z.string().min(1, "UPLOADTHING_SECRET is required"),
  UPLOADTHING_APP_ID: z.string().min(1, "UPLOADTHING_APP_ID is required"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  CONTACT_EMAIL: z.string().email("CONTACT_EMAIL must be a valid email"),
});

let cachedEnv: z.infer<typeof envSchema> | null = null;

/**
 * Lazily validates and returns environment variables.
 * Validation happens on first access (at runtime), not at module load,
 * so the build process can collect page data without throwing.
 */
export function getEnv(): z.infer<typeof envSchema> {
  if (cachedEnv) return cachedEnv;

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)
    );
    throw new Error("Invalid environment variables");
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

