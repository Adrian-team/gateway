import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
  AUTH_MICROSERVICE_HOST: string;
  AUTH_MICROSERVICE_PORT: number;
  NATS_SERVERS: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
    AUTH_MICROSERVICE_HOST: joi.string().required(),
    AUTH_MICROSERVICE_PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  product_ms_host: envVars.PRODUCTS_MICROSERVICE_HOST,
  product_ms_port: envVars.PRODUCTS_MICROSERVICE_PORT,
  order_ms_host: envVars.ORDERS_MICROSERVICE_HOST,
  order_ms_port: envVars.ORDERS_MICROSERVICE_PORT,
  auth_ms_host: envVars.AUTH_MICROSERVICE_HOST,
  auth_ms_port: envVars.AUTH_MICROSERVICE_PORT,
  natsServers: envVars.NATS_SERVERS,
};
