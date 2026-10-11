import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const server = app.listen(PORT, () => {
  console.log(`
  🚀 Pokémon Master API is running!
  📡 Server:        http://localhost:${PORT}
  📖 Swagger Docs:  http://localhost:${PORT}/api/docs
  ❤️  Health Check:  http://localhost:${PORT}/health
  🎮 API Base:      http://localhost:${PORT}/api/v1
  `);
});

// Graceful shutdown handling
const handleGracefulShutdown = (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Force shutdown after 5 seconds timeout.');
    process.exit(1);
  }, 5000).unref();
};

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
