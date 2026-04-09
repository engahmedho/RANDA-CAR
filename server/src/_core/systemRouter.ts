import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const systemRouter = router({
  health: publicProcedure
    .output(z.object({
      status: z.string(),
      timestamp: z.date(),
      version: z.string(),
    }))
    .query(() => ({
      status: 'ok',
      timestamp: new Date(),
      version: '1.0.0',
    })),

  info: publicProcedure
    .output(z.object({
      name: z.string(),
      description: z.string(),
      environment: z.string(),
    }))
    .query(() => ({
      name: 'Car Price Predictor SA',
      description: 'AI-powered car price prediction for Saudi Arabian market',
      environment: process.env.NODE_ENV || 'development',
    })),
});
