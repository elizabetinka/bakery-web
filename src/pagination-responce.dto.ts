import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Photo } from './photos/entities/photo.entity';
import { Cake } from './cakes/entities/cake.entity';
import { Pastry } from './pastries/entities/pastry.entity';
import { User } from './users/entities/user.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './order-items/entities/order-item.entity';

@ObjectType()
export class PaginationMetaDto {

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: 100,
    description: 'Общее количество элементов',
  })
  totalItems: number;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: 1,
    description: 'Текущая страница',
  })
  currentPage: number;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: 10,
    description: 'Количество элементов на странице',
  })
  itemsPerPage: number;
}

@ObjectType()
export class PaginationResponceDtoPhoto {

  @Field(() => [Photo])
  @ApiProperty({
    description: 'Массив данных',
    type: 'array',
  })
  data: Photo[];

  @Field(() => PaginationMetaDto)
  @ApiProperty({
    description: 'Мета-информация о пагинации',
    type: () => PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: 5,
    description: 'Общее количество страниц',
  })
  total: number;

  @Field(() => String)
  @ApiProperty({
    example: '/api/cakes?page=1&limit=10, /api/cakes?page=3&limit=10',
    description: 'Ссылки для навигации (предыдущая/следующая страницы)',
    type: () => String,
  })
  links: string;
}

@ObjectType()
export class PaginationResponceDtoCake {

  @Field(() => [Cake])
  @ApiProperty({
    description: 'Массив данных',
    type: 'array',
  })
  data: Cake[];

  @Field(() => PaginationMetaDto)
  @ApiProperty({
    description: 'Мета-информация о пагинации',
    type: () => PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: 5,
    description: 'Общее количество страниц',
  })
  total: number;

  @Field(() => String)
  @ApiProperty({
    example: '/api/cakes?page=1&limit=10, /api/cakes?page=3&limit=10',
    description: 'Ссылки для навигации (предыдущая/следующая страницы)',
    type: () => String,
  })
  links: string;
}

@ObjectType()
export class PaginationResponceDtoPastry {

  @Field(() => [Pastry])
  @ApiProperty({
    description: 'Массив данных',
    type: 'array',
  })
  data: Pastry[];

  @Field(() => PaginationMetaDto)
  @ApiProperty({
    description: 'Мета-информация о пагинации',
    type: () => PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: 5,
    description: 'Общее количество страниц',
  })
  total: number;

  @Field(() => String)
  @ApiProperty({
    example: '/api/cakes?page=1&limit=10, /api/cakes?page=3&limit=10',
    description: 'Ссылки для навигации (предыдущая/следующая страницы)',
    type: () => String,
  })
  links: string;
}

@ObjectType()
export class PaginationResponceDtoUser {

  @Field(() => [User])
  @ApiProperty({
    description: 'Массив данных',
    type: 'array',
  })
  data: User[];

  @Field(() => PaginationMetaDto)
  @ApiProperty({
    description: 'Мета-информация о пагинации',
    type: () => PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: 5,
    description: 'Общее количество страниц',
  })
  total: number;

  @Field(() => String)
  @ApiProperty({
    example: '/api/cakes?page=1&limit=10, /api/cakes?page=3&limit=10',
    description: 'Ссылки для навигации (предыдущая/следующая страницы)',
    type: () => String,
  })
  links: string;
}

@ObjectType()
export class PaginationResponceDtoOrder {

  @Field(() => [Order])
  @ApiProperty({
    description: 'Массив данных',
    type: 'array',
  })
  data: Order[];

  @Field(() => PaginationMetaDto)
  @ApiProperty({
    description: 'Мета-информация о пагинации',
    type: () => PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: 5,
    description: 'Общее количество страниц',
  })
  total: number;

  @Field(() => String)
  @ApiProperty({
    example: '/api/cakes?page=1&limit=10, /api/cakes?page=3&limit=10',
    description: 'Ссылки для навигации (предыдущая/следующая страницы)',
    type: () => String,
  })
  links: string;
}

@ObjectType()
export class PaginationResponceDtoOrderItem {

  @Field(() => [OrderItem])
  @ApiProperty({
    description: 'Массив данных',
    type: 'array',
  })
  data: OrderItem[];

  @Field(() => PaginationMetaDto)
  @ApiProperty({
    description: 'Мета-информация о пагинации',
    type: () => PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: 5,
    description: 'Общее количество страниц',
  })
  total: number;

  @Field(() => String)
  @ApiProperty({
    example: '/api/cakes?page=1&limit=10, /api/cakes?page=3&limit=10',
    description: 'Ссылки для навигации (предыдущая/следующая страницы)',
    type: () => String,
  })
  links: string;
}


