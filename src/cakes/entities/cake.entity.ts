import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Cake {

  @Field(() => Int)
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
    example: 'Самый вкусный торт на свете',
    description: 'Описание',
    type: () => String,
  })
  @Column('text')
  description: string;

  @Field(() => Number)
  @ApiProperty({
    example: '15000.30',
    description: 'Стоимость за один килограмм',
    required: true,
    type: () => Number,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => Boolean)
  @ApiProperty({
    example: 'true',
    description: 'Можно ли сейчас заказать?',
    required: true,
    type: () => Boolean,
  })
  @Column('boolean', { default: true })
  isAvailable: boolean;

  @Field(() => String)
  @ApiProperty({
    example:
      'https://s.iimg.su/s/19/7b2FdwRxSvnXGgzn2IG4XzU2gaSuUDCNQw4fBfIy.jpg',
    description: 'Ссылка на картинку',
    type: () => String,
  })
  @Column('text')
  image: string;
}
