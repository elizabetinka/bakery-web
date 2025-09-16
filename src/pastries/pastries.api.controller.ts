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
import { PastriesService } from './pastries.service';
import { CreatePastryDto } from './dto/create-pastry.dto';
import { UpdatePastryDto } from './dto/update-pastry.dto';
import { PaginationInterceptor } from '../interceptors/pagination.interceptor';
import { PaginationRequestDto } from '../pagination-request.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDefaultErrorResponses } from '../decorator/swagger-default-responses.decorator';
import { PaginationResponceDtoCake, PaginationResponceDtoPastry } from '../pagination-responce.dto';
import { CacheControl } from '../decorator/cache-control.decorator';
import { CacheTTL } from '@nestjs/cache-manager';

@ApiTags('api/pastries')
@Controller('api/pastries')
export class PastriesApiController {
  constructor(
    @Inject(PastriesService) private readonly pastriesService: PastriesService,
  ) {}

  @ApiOperation({ summary: 'Создание пирожного' })
  @ApiResponse({
    status: 201,
    description: 'Пирожное создан',
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные пирожного',
    type: () => CreatePastryDto,
  })
  @Post()
  async create(@Body() createPastryDto: CreatePastryDto) {
    await this.pastriesService.create(createPastryDto);
  }

  @Post('search')
  @ApiOperation({ summary: 'Получение пирожных в которых есть строка' })
  @ApiResponse({
    status: 200,
    description: 'Пирожные получены',
    type: () => PaginationResponceDtoCake,
  })
  @ApiDefaultErrorResponses()
  @ApiQuery({
    example: "кре",
    description: 'Паттерн',
    type: () => String,
  })
  async findAllIncludeString(@Body() pattern: string) {
    return await this.pastriesService.findAllIncludeString(pattern);
  }


  @Get()
  @Header('Link', '')
  @UseInterceptors(PaginationInterceptor)
  @ApiOperation({ summary: 'Получение пирожных' })
  @ApiResponse({
    status: 201,
    description: 'Пирожные получены',
    type: () => PaginationResponceDtoPastry,
  })
  @ApiDefaultErrorResponses()
  @ApiQuery({
    example: { page: 1, limit: 50 },
    description: 'Пагинационный запрос',
    type: () => PaginationRequestDto,
  })
  async findAll(@Query() paginationDto: PaginationRequestDto) {
    const { data, links, totalPages } =
      await this.pastriesService.findAll(paginationDto);
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

  @ApiOperation({ summary: 'Редиктирование пирожного' })
  @ApiResponse({
    status: 201,
    description: 'Пирожное отредактирован',
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные пирожного',
    type: () => UpdatePastryDto,
  })
  @ApiParam({
    name: 'id',
    description: 'ID пирожного для обновления',
    example: '60',
    type: () => String,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePastryDto: UpdatePastryDto) {
    await this.pastriesService.update(+id, updatePastryDto);
  }

  @ApiOperation({ summary: 'Удаление пирожного' })
  @ApiResponse({
    status: 201,
    description: 'Пирожное удалено',
  })
  @ApiDefaultErrorResponses()
  @ApiParam({
    name: 'id',
    description: 'ID пирожного для удаления',
    example: '60',
    type: () => String,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.pastriesService.remove(+id);
  }
}
