import { Module } from '@nestjs/common';
import { SseService } from './notification.service';
import { SseController } from './notification.controller';

@Module({
  controllers: [SseController],
  providers: [SseService],
  exports: [SseService],
})
export class NotificationModule {}
