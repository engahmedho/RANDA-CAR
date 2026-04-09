import { initTRPC } from '@trpc/server';
import { z } from 'zod';

export interface Context {
  user?: {
    id: string;
    name?: string;
    email?: string;
  };
  req?: any;
  res?: any;
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
