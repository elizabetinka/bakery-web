import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDefaultErrorResponses } from '../decorator/swagger-default-responses.decorator';
import { Order } from './entities/order.entity';
import { PaginationResponceDtoOrder } from '../pagination-responce.dto';
import { PaginationRequestDto } from '../pagination-request.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Создание заказа' })
  @ApiResponse({
    status: 201,
    description: 'Заказ создан',
    type: () => Order,
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные заказа',
    type: () => CreateOrderDto,
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Получение заказов' })
  @ApiResponse({
    status: 200,
    description: 'Торты получены',
    type: () => PaginationResponceDtoOrder,
  })
  @ApiDefaultErrorResponses()
  @Get()
  async findAll(@Query() paginationDto: PaginationRequestDto) {
    console.log(paginationDto);
    const { data, links, totalPages } =
      await this.ordersService.findAll(paginationDto);
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

  @ApiOperation({ summary: 'Получение заказа' })
  @ApiResponse({
    status: 200,
    description: 'Заказ получен',
    type: () => Order,
  })
  @ApiParam({
    name: 'id',
    description: 'ID заказа для удаления',
    example: '60',
    type: () => String,
  })
  @ApiDefaultErrorResponses()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(+id);
  }


  @ApiOperation({ summary: 'Редиктирование заказа' })
  @ApiResponse({
    status: 200,
    description: 'Заказ отредактирован',
    type: () => Order,
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные заказа',
    type: () => UpdateOrderDto,
  })
  @ApiParam({
    name: 'id',
    description: 'ID азказа для обновления',
    example: '60',
    type: () => String,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @ApiResponse({
    status: 200,
    description: 'Заказ удален',
  })
  @ApiDefaultErrorResponses()
  @ApiParam({
    name: 'id',
    description: 'ID заказа для удаления',
    example: '60',
    type: () => String,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(+id);
  }
}
