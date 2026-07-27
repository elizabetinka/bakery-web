import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Inject,
  Render,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { ApiExcludeController } from '@nestjs/swagger';
import { AuthStateService } from '../auth/auth-state.service';

@Controller('photos')
@ApiExcludeController()
export class PhotosMvcController {
  constructor(
    @Inject(PhotosService) private readonly photosService: PhotosService,
    private readonly authStateService: AuthStateService,
  ) {}

  @Get(':id')
  @Render('pages/photo_details')
  async findOne(@Param('id') id: string) {
    const photo = await this.photosService.findOne(+id);
    return {
      photo: photo,
      user: this.authStateService.getUser(),
      scripts: ['photo_item_loader'],
    };
  }
}
