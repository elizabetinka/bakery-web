import { parse } from 'pg-connection-string';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfig {
  constructor(private readonly configService: ConfigService) {}

  getTypeOrmConfig(): TypeOrmModuleOptions {
    const connectionString = this.configService.get<string>('DATABASE_URL');
    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined');
    }
    const config = parse(connectionString);
    return {
      type: 'postgres',
      host: config.host ?? 'localhost',
      port: config.port ? parseInt(config.port, 10) : 5432,
      username: config.user,
      password: config.password,
      database: config.database ?? 'default_db',
      autoLoadEntities: true,
      migrations: ['src/migrations/*.ts'],
      //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }
}