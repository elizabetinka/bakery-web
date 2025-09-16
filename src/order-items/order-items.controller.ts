import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderItem } from './entities/order-item.entity';
import { ApiDefaultErrorResponses } from '../decorator/swagger-default-responses.decorator';
import { PaginationResponceDtoOrderItem } from '../pagination-responce.dto';
import { PaginationRequestDto } from '../pagination-request.dto';

@ApiTags('api/order-items')
@Controller('api/order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}


  @ApiOperation({ summary: 'Создание элемента заказа' })
  @ApiResponse({
    status: 201,
    description: 'Элемент создан',
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные элемента заказа',
    type: () => CreateOrderItemDto,
  })
  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    await this.orderItemsService.create(createOrderItemDto);
  }

  @ApiOperation({ summary: 'Получение элементов заказов' })
  @ApiResponse({
    status: 201,
    description: 'Торты получены',
    type: () => PaginationResponceDtoOrderItem,
  })
  @ApiDefaultErrorResponses()
  @ApiQuery({
    example: { page: 1, limit: 50 },
    description: 'Пагинационный запрос',
    type: () => PaginationRequestDto,
  })
  async findAll(@Query() paginationDto: PaginationRequestDto) {
    console.log(paginationDto);
    const { data, links, totalPages } =
      await this.orderItemsService.findAll(paginationDto);
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

  @ApiOperation({ summary: 'Получение элемента' })
  @ApiResponse({
    status: 201,
    description: 'Элемент получен',
    type: () => OrderItem,
  })
  @ApiParam({
    name: 'id',
    description: 'ID элемента для удаления',
    example: '60',
    type: () => String,
  })
  @ApiDefaultErrorResponses()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderItemsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Редиктирование элемента заказа' })
  @ApiResponse({
    status: 201,
    description: 'Элемент отредактирован',
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные торта',
    type: () => UpdateOrderItemDto,
  })
  @ApiParam({
    name: 'id',
    description: 'ID торта для обновления',
    example: '60',
    type: () => String,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    await this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @ApiOperation({ summary: 'Удаление элемента' })
  @ApiResponse({
    status: 201,
    description: 'Элемент удален',
  })
  @ApiDefaultErrorResponses()
  @ApiParam({
    name: 'id',
    description: 'ID элемента для удаления',
    example: '60',
    type: () => String,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.orderItemsService.remove(+id);
  }
}
