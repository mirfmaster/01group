import fastify from 'fastify';
import swaggerPlugin from '@fastify/swagger';
import swaggerPluginUi from '@fastify/swagger-ui';
import fastifyPrintRoutes from 'fastify-print-routes';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = fastify();

app.get('/', async (req, res) => {
  return { message: 'Hello API' };
});

const start = async () => {
  try {
    await app.register(fastifyPrintRoutes);
    await app.register(swaggerPlugin, {
      swagger: {
        info: {
          title: 'Doc',
          description: 'Doc',
          version: '1.0.0',
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        definitions: {},
        securityDefinitions: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
      },
    });

    await app.register(swaggerPluginUi, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject, _request, _reply) => {
        return swaggerObject;
      },
      transformSpecificationClone: true,
    });

    await app.listen({ port });
    console.log(`[ ready ] http://localhost:${port}`);
  } catch (err) {
    // Errors are logged here
    process.exit(1);
  }
};

start();
