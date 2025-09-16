import { DataSource } from 'typeorm';
import { parse } from 'pg-connection-string';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const connectionString = configService.get<string>('DATABASE_URL');
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const config = parse(connectionString);

export default new DataSource({
  type: 'postgres',
  host: config.host ?? 'localhost',
  port: config.port ? parseInt(config.port, 10) : 5432,
  username: config.user,
  password: config.password,
  database: config.database ?? 'default_db',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/infrastructure/migrations/*.ts'],
  synchronize: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});