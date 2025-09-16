import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pastry } from '../../pastries/entities/pastry.entity';
import { Cake } from '../../cakes/entities/cake.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/entities/order.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class OrderItem {
  @Field(() => Int)
  @ApiProperty({
    example: '10',
    description: 'id',
    required: true,
    type: () => Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Order)
  @ApiProperty({
    example: 'Заказ',
    description: 'Родительский закз',
    type: () => Order,
  })
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @Field(() => Cake)
  @ApiProperty({
    example: '{name: \'Медовик\',description:\'Вечная класика. Торт из медовых коржей с нежным кремом. Подается с ягодами.\', price: 2000, isAvailable: true, image: \'https://s.iimg.su/s/19/7b2FdwRxSvnXGgzn2IG4XzU2gaSuUDCNQw4fBfIy.jpg\'}',
    description: 'Указывается если это торт',
    type: () => Cake,
  })
  @ManyToOne(() => Cake, { nullable: true })
  cake?: Cake;

  @Field(() => Pastry)
  @ApiProperty({
    example: '{name: \'Медовик\',description:\'Вечная класика. Торт из медовых коржей с нежным кремом. Подается с ягодами.\', price: 2000, isAvailable: true, image: \'https://s.iimg.su/s/19/7b2FdwRxSvnXGgzn2IG4XzU2gaSuUDCNQw4fBfIy.jpg\'}',
    description: 'Указывается если это торт',
    type: () => Pastry,
  })
  @ManyToOne(() => Pastry, { nullable: true })
  pastry?: Pastry;

  @Field(() => Int)
  @ApiProperty({
    example: '2',
    description: 'Количество этого эелемента',
    type: () => Number,
  })
  @Column('integer')
  quantity: number;

  @Field(() => Number)
  @ApiProperty({
    example: '2000.00',
    description: 'Стоимость элемента заказа',
    type: () => Number,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  itemPrice: number;
}
