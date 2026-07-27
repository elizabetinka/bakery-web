import { Module } from '@nestjs/common';
import { PastriesService } from './pastries.service';
import { PastriesApiController } from './pastries.api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pastry } from './entities/pastry.entity';
import { PastriesMvcController } from './pastries.mvc.controller';
import { PastriesResolver } from './pastries.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pastry]), AuthModule],
  controllers: [PastriesApiController, PastriesMvcController],
  providers: [PastriesService, PastriesResolver],
})
export class PastriesModule {}
