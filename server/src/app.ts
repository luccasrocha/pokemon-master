import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import { createApiRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './utils/errors';

export const createApp = (): Application => {
  const app = express();

  // Security & Utility Middlewares
  app.use(helmet({ contentSecurityPolicy: false })); // allow swagger ui inline assets
  app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'] }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logger (only log in non-test env)
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Swagger Documentation UI
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: 'Pokémon Master API Docs',
      customCss: '.swagger-ui .topbar { background-color: #ef4444; }',
    })
  );

  // Health Check Endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'pokemon-api',
      version: '1.0.0',
      memoryUsage: process.memoryUsage(),
    });
  });

  // Mount API v1 (both with and without /api prefix for Vercel serverless compatibility)
  const apiRouter = createApiRouter();
  app.use('/api/v1', apiRouter);
  app.use('/v1', apiRouter);

  // Root Welcome & Discovery
  app.get('/', (_req: Request, res: Response) => {
    res.json({
      message: '⚡ Welcome to Pokémon Master REST API',
      version: '1.0.0',
      documentation: '/api/docs',
      health: '/health',
      endpoints: {
        pokemon: '/api/v1/pokemon',
        types: '/api/v1/pokemon/types',
        random: '/api/v1/pokemon/random',
        teams: '/api/v1/teams',
        battle: '/api/v1/battle/simulate',
      },
    });
  });

  // 404 Handler for undefined routes
  app.use((req: Request, _res: Response, next) => {
    next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
