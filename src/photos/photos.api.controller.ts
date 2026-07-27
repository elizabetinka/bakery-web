import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Inject, UseInterceptors, Query,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PaginationInterceptor } from '../interceptors/pagination.interceptor';
import { PaginationRequestDto } from '../pagination-request.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDefaultErrorResponses } from '../decorator/swagger-default-responses.decorator';
import { PaginationResponceDtoPhoto } from '../pagination-responce.dto';
import { Photo } from './entities/photo.entity';

@ApiTags('photos')
@Controller('api/photos')
export class PhotosApiController {
  constructor(
    @Inject(PhotosService) private readonly photosService: PhotosService,
  ) {}

  @ApiOperation({ summary: 'Создание фото' })
  @ApiResponse({
    status: 201,
    description: 'Фото создан',
    type: () => Photo,
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные фото',
    type: () => CreatePhotoDto,
  })
  @Post()
  async create(@Body() createPhotoDto: CreatePhotoDto) {
    return await this.photosService.create(createPhotoDto);
  }

  @Get()
  @Header('Link', '')
  @UseInterceptors(PaginationInterceptor)
  @ApiOperation({ summary: 'Получение фоток' })
  @ApiResponse({
    status: 201,
    description: 'Фотки получены',
    type: () => PaginationResponceDtoPhoto,
  })
  @ApiDefaultErrorResponses()
  async findAll(@Query() paginationDto: PaginationRequestDto) {
    const { data, links, totalPages } =
      await this.photosService.findAll(paginationDto);
    return {
      data: data,
      meta: {
        totalItems: data.length,
        currentPage: paginationDto.page,
        itemsPerPage: paginationDto.limit,
      },
      total: totalPages,
      links: links.join(', '),
    };
  }

  @ApiOperation({ summary: 'Редиктирование фото' })
  @ApiResponse({
    status: 201,
    description: 'Фото отредактировано',
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные фото',
    type: () => UpdatePhotoDto,
  })
  @ApiParam({
    name: 'id',
    description: 'ID фото для обновления',
    example: '60',
    type: () => String,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return await this.photosService.update(+id, updatePhotoDto);
  }

  @ApiOperation({ summary: 'Удаление фото' })
  @ApiResponse({
    status: 201,
    description: 'Фото удалено',
  })
  @ApiDefaultErrorResponses()
  @ApiParam({
    name: 'id',
    description: 'ID фото для удаления',
    example: '60',
    type: () => String,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.photosService.remove(+id);
  }
}
