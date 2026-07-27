import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './infrastructure/database/database.module';
import { join } from 'path';
import { OrderItemsModule } from './order-items/order-items.module';
import { PastriesModule } from './pastries/pastries.module';
import { CakesModule } from './cakes/cakes.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { NotificationModule } from './notification/notification.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { depthLimit } from '@graphile/depth-limit';
import { CacheModule } from '@nestjs/cache-manager';

import {
  createComplexityRule,
  fieldExtensionsEstimator,
  simpleEstimator,
} from 'graphql-query-complexity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { StorageModule } from './storage/storage.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: true,
      introspection: true,
      validationRules: [
        depthLimit({ maxDepth: 5 }),
        createComplexityRule({
          maximumComplexity: 1000,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
          onComplete: (complexity: number) => {
            console.log(`Query Complexity: ${complexity}`);
          },
        }),
      ],
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 5,
      max: 100,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    NotificationModule,
    DatabaseModule,
    UsersModule,
    OrdersModule,
    CakesModule,
    PastriesModule,
    OrderItemsModule,
    PhotosModule,
    StorageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },],
})
export class AppModule {}
