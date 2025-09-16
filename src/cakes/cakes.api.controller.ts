import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Header,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { CakesService } from './cakes.service';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';
import { SseService } from '../notification/notification.service';
import { PaginationRequestDto } from '../pagination-request.dto';
import { PaginationInterceptor } from '../interceptors/pagination.interceptor';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationResponceDtoCake } from '../pagination-responce.dto';
import { ApiDefaultErrorResponses } from '../decorator/swagger-default-responses.decorator';
import { CacheControl } from '../decorator/cache-control.decorator';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ETagInterceptor } from '../interceptors/etag.interceptor';
import { Cake } from './entities/cake.entity';


@ApiTags('api/cakes')
@Controller('api/cakes')
export class CakesApiController {
  constructor(
    @Inject(CakesService) private readonly cakesService: CakesService,
    @Inject(SseService) private readonly sseService: SseService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание торта' })
  @ApiResponse({
    status: 201,
    description: 'Торт создан',
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные торта',
    type: () => CreateCakeDto,
  })
  async create(@Body() createCakeDto: CreateCakeDto) {
    console.log("create ",createCakeDto);
    const result = await this.cakesService.create(createCakeDto);
    this.sseService.addEvent({
      type: 'ADD',
      data: { name: createCakeDto.name },
    });
  }

  @CacheKey('cakes_list_api')
  @CacheTTL(5)
  @Get()
  @Header('Link', '')
  @UseInterceptors(PaginationInterceptor)
  @CacheControl(5)
  @UseInterceptors(ETagInterceptor)
  @ApiOperation({ summary: 'Получение тортов' })
  @ApiResponse({
    status: 201,
    description: 'Торты получены',
    type: () => PaginationResponceDtoCake,
  })
  @ApiDefaultErrorResponses()
  @ApiQuery({
    example: { page: 1, limit: 50 },
    description: 'Пагинационный запрос',
    type: () => PaginationRequestDto,
  })
  async findAll(@Query() paginationDto: PaginationRequestDto) {
    const { data, links, totalPages } =
      await this.cakesService.findAll(paginationDto);

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


  @CacheTTL(5)
  @Get('search')
  @ApiOperation({ summary: 'Получение тортов в которых есть строка' })
  @ApiResponse({
    status: 201,
    description: 'Торты получены',
    type: () => [Cake],
  })
  @ApiDefaultErrorResponses()
  @ApiQuery({
    example: "кре",
    description: 'Паттерн',
    type: () => String,
  })
  @Header('Content-Type', 'application/json')
  async findAllIncludeString(@Query('pattern') pattern: string) {
    const cakes = await this.cakesService.findAllIncludeString(pattern);
    return { data: cakes };
  }

  @ApiOperation({ summary: 'Редиктирование торта' })
  @ApiResponse({
    status: 201,
    description: 'Торт отредактирован',
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные торта',
    type: () => UpdateCakeDto,
  })
  @ApiParam({
    name: 'id',
    description: 'ID торта для обновления',
    example: '60',
    type: () => String,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCakeDto: UpdateCakeDto) {
    const result = await this.cakesService.update(+id, updateCakeDto);
    this.sseService.addEvent({
      type: 'UPDATED',
      data: { id: +id },
    });
    return result;
  }

  @ApiOperation({ summary: 'Удаление торта' })
  @ApiResponse({
    status: 201,
    description: 'Торт удален',
  })
  @ApiDefaultErrorResponses()
  @ApiParam({
    name: 'id',
    description: 'ID торта для удаления',
    example: '60',
    type: () => String,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.cakesService.remove(+id);
    this.sseService.addEvent({
      type: 'DELETED',
      data: { id: +id },
    });
    return result;
  }
}
