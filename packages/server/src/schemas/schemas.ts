import { prefix } from '@geoText/core';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const ENVSchema = z.object({
  DB_UN: z.string(),
  DB_PW: z.string(),
  DB_CLUSTER: z.string(),
  DB: z.string(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});
const ENV = ENVSchema.parse(process.env);
const { DB_UN, DB_PW, DB_CLUSTER, DB } = ENV;

// eslint-disable-next-line max-len
const url = `mongodb+srv://${DB_UN}:${DB_PW}@${DB}.${DB_CLUSTER}.mongodb.net/${DB}`;

export const FastifyRegisterOptionsSchema = z
  .object({
    url: z.string(),
    prefix: z.string(),
    logger: z.object({
      transport: z.object({ target: z.string() }),
    }),
    maxParamLength: z.number(),
  })
  .default({
    url,
    prefix: prefix,
    logger: { transport: { target: 'pino-pretty' } },
    maxParamLength: 2000,
  });

export const MongoDBOptions = z
  .object({
    forceClose: z.boolean().optional(),
    url: z.string(),
  })
  .default({ forceClose: true, url });
