import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosApiController } from './photos.api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { PhotosMvcController } from './photos.mvc.controller';
import { PhotoResolver } from './photo.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), AuthModule],
  controllers: [PhotosApiController, PhotosMvcController],
  providers: [PhotosService, PhotoResolver],
})
export class PhotosModule {}
