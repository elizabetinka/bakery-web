import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Photo {

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
    example:
      'https://s.iimg.su/s/19/7b2FdwRxSvnXGgzn2IG4XzU2gaSuUDCNQw4fBfIy.jpg',
    description: 'Ссылка на картинку',
    type: () => String,
  })
  @Column('text')
  image: string;
}
