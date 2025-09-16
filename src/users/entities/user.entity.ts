import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'Роли пользователей в системе',
});

@ObjectType()
@Entity()
export class User {
  @Field(() => Number)
  @ApiProperty({
    example: '10',
    description: 'id',
    required: true,
    type: () => Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @ApiProperty({
    example: 'Черный лес',
    description: 'Название торта',
    required: true,
    type: () => String,
  })
  @Column('varchar', { length: 255 })
  name: string;

  @Field(() => String)
  @ApiProperty({
    example: 'ejkhbjknkn@mail.ru',
    description: 'Почта',
    required: true,
    type: () => String,
  })
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Field(() => String)
  @ApiProperty({
    example: 'ejkhbjknkn@mail.ru',
    description: 'Пароль',
    required: true,
    type: () => String,
  })
  @Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Field(() => Role)
  @ApiProperty({
    description: 'Роль пользователя',
    enum: Role,
    default: Role.CUSTOMER,
  })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role = Role.CUSTOMER;

  @Field(() => [Order], { nullable: true })
  @ApiProperty({
    description: 'Заказы пользователя',
    type: () => Order,
  })
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
