import { registerAs } from "@nestjs/config";
import * as Joi from "joi";

const DEFAULT_PORT = 5000;


export interface ApplicationConfig {
  port: number;
  postgres: {
    user: string;
    password: string;
    db: string;
    host: string;
    port: number;
  }
  pgAdmin: {
    defaultEmail: string;
    defaultPassword: string;
  }
  dbUrl: string;
  fileUploader: {
    rootPath: string;
    serveRoot: string;
  }
}

const validationSchema = Joi.object({
  port: Joi.number().port().default(DEFAULT_PORT),
  postgres: Joi.object({
    user: Joi.string().required(),
    password: Joi.string().required(),
    db: Joi.string().required(),
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().required(),
  }),
  pgAdmin: {
    defaultEmail: Joi.string().required(),
    defaultPassword: Joi.string().required(),
  },
  dbUrl: Joi.string().required(),
  fileUploader: {
    rootPath: Joi.string().required(),
    serveRoot: Joi.string().required(),
  },
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    postgres: {
      db: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      user: process.env.POSTGRES_USER,
    },
    dbUrl: process.env.DATABASE_URL,
    pgAdmin: {
      defaultEmail: process.env.PGADMIN_DEFAULT_EMAIL,
      defaultPassword: process.env.PGADMIN_DEFAULT_PASSWORD,
    },
    fileUploader: {
      rootPath: process.env.UPLOAD_DIRECTORY_PATH,
      serveRoot: process.env.SERVE_ROOT,
    }
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);