import cors from '@fastify/cors';
import fastifyMongodb from '@fastify/mongodb';
import { port } from '@storySaver/core';
import Fastify from 'fastify';
import mongoose from 'mongoose';
// import routes from './routes/routes.js';
import {
  FastifyRegisterOptionsSchema,
  MongoDBOptions,
} from './schemas/schemas.js';

const cfg = FastifyRegisterOptionsSchema.parse(undefined);

mongoose.set('strictQuery', true);
const fastify = Fastify(cfg);
await fastify.register(cors);
await fastify.register(fastifyMongodb, MongoDBOptions.parse(undefined));
// await fastify.register(routes, { prefix: cfg.prefix });

/** Healthcheck */
fastify.get('/ping', (req, reply) => {
  return reply.send('pong');
});

await (async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(cfg.url);

    // Start the Fastify server
    await fastify.listen({ port });
  } catch (error) {
    console.error(error);
  }
})();
