import {
  Column,
  Entity, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderItem } from '../../order-items/entities/order-item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '../../users/entities/user.entity';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Статус заказа',
});

@ObjectType()
@Entity()
export class Order {
  @Field(() => Int)
  @ApiProperty({
    example: '10',
    description: 'id',
    required: true,
    type: () => Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ApiProperty({
    description: 'Пользовател',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @Field(() => [OrderItem])
  @ApiProperty({
    description: 'Элементы заказа',
    type: () => OrderItem,
  })
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Field(() => OrderStatus)
  @ApiProperty({
    description: 'Статус заказа',
    enum: OrderStatus,
    default: OrderStatus.NEW,
  })
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.NEW,
  })
  status: OrderStatus = OrderStatus.NEW;

  @Field(() => Number)
  @ApiProperty({
    example: '1000000',
    description: 'Цена за весь заказ',
    type: () => Number,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number = 0;
}
