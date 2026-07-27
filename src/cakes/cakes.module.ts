import { Module } from '@nestjs/common';
import { CakesService } from './cakes.service';
import { CakesMvcController } from './cakes.mvc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cake } from './entities/cake.entity';
import { NotificationModule } from '../notification/notification.module';
import { CakesApiController } from './cakes.api.controller';
import { CakeResolver } from './cakes.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cake]), NotificationModule, AuthModule],
  controllers: [CakesMvcController, CakesApiController],
  providers: [CakesService, CakeResolver],
  exports: [CakesService],
})
export class CakesModule {}
