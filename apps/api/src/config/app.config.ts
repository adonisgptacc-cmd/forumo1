import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().min(0).max(65535).default(3000),
  DATABASE_URL: z
    .string()
    .url()
    .default('postgresql://postgres:postgres@localhost:5432/forumo?schema=public'),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  JWT_ACCESS_SECRET: z.string().min(16).default('development-access-secret-change-me'),
  JWT_REFRESH_SECRET: z.string().min(16).default('development-refresh-secret-change-me'),
});

export type AppConfigType = z.infer<typeof configSchema>;

export const AppConfig = registerAs('http', () => ({
  environment: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
}));

export const validateConfig = (config: Record<string, unknown>) => configSchema.parse(config);
