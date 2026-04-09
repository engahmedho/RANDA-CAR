import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

export function createContext(opts?: CreateHTTPContextOptions) {
  return {
    req: opts?.req,
    res: opts?.res,
    user: null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
