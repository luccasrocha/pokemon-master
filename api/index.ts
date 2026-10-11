import type { IncomingMessage, ServerResponse } from 'http';
import app from '../server/src/app';

type VercelRequest = IncomingMessage & { url?: string };

export default function handler(req: VercelRequest, res: ServerResponse): void {
  // Vercel rewrites every public API URL to this function. Restore the original
  // path before passing the request to Express, and keep the user's query string.
  const requestUrl = new URL(req.url || '/', 'http://localhost');
  const originalPath = requestUrl.searchParams.get('_path');

  if (originalPath) {
    requestUrl.searchParams.delete('_path');
    req.url = `${originalPath}${requestUrl.search}`;
  }

  app(req as never, res as never);
}
