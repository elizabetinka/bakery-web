// storage/storage.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ConfigModule,
    MulterModule.register({
    dest: './uploads',
  }),],
  providers: [StorageService],
  exports: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}