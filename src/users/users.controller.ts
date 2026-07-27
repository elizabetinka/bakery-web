import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDefaultErrorResponses } from '../decorator/swagger-default-responses.decorator';
import { User } from './entities/user.entity';
import { PaginationResponceDtoUser } from '../pagination-responce.dto';
import { PaginationRequestDto } from '../pagination-request.dto';

@ApiTags('api/users')
@Controller('api/users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь создан',
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные пользоватеа',
    type: () => CreateUserDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Пользователи получены',
    type: () => User,
  })
  @ApiDefaultErrorResponses()
  @Get()
  async findAll(@Query() paginationDto: PaginationRequestDto) {
    const { data, links, totalPages } =
      await this.usersService.findAll(paginationDto);
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

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь получен',
    type: () => User,
  })
  @ApiParam({
    name: 'id',
    description: 'ID пользователя для удаления',
    example: '60',
    type: () => String,
  })
  @ApiDefaultErrorResponses()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Редиктирование пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь отредактирован',
    type: () => User,
  })
  @ApiDefaultErrorResponses()
  @ApiBody({
    description: 'Данные польззователя',
    type: () => UpdateUserDto,
  })
  @ApiParam({
    name: 'id',
    description: 'ID пользователя для обновления',
    example: '60',
    type: () => String,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь удален',
  })
  @ApiDefaultErrorResponses()
  @ApiParam({
    name: 'id',
    description: 'ID пользователя для удаления',
    example: '60',
    type: () => String,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }
}
