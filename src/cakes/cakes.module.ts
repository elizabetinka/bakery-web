import { Module } from '@nestjs/common';
import { CakesService } from './cakes.service';
import { CakesMvcController } from './cakes.mvc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cake } from './entities/cake.entity';
import { NotificationModule } from '../notification/notification.module';
import { CakesApiController } from './cakes.api.controller';
import { CakeResolver } from './cakes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Cake]), NotificationModule],
  controllers: [CakesMvcController, CakesApiController],
  providers: [CakesService, CakeResolver],
  exports: [CakesService],
})
export class CakesModule {}
