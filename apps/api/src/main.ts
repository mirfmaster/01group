import fastify from 'fastify';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        colorize: true,
        ignore: 'pid,hostname',
      },
    },
  },
});

app.get('/', async (req, res) => {
  return { message: 'Hello API' };
});

const start = async () => {
  try {
    await app.listen({ port });
    console.log(`[ ready ] http://localhost:${port}`);
  } catch (err) {
    // Errors are logged here
    process.exit(1);
  }
};

start();
