import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCakeDto {
  @Field(() => String)
  @ApiProperty({
    type: () => String,
    example: 'Черный лес',
    description: 'Название торта',
    required: true,
  })
  @IsString()
  name: string;

  @Field(() => String)
  @ApiProperty({
    type: () => String,
    example: 'Самый вкусный торт на свете',
    description: 'Описание',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String)
  @ApiProperty({
    type: () => String,
    example:
      'https://s6.iimage.su/s/20/uJ7fVi9xymBZFtKg10VFI7gme2UBANcRjGr0ZN8nc.jpg',
    description: 'Ссылка на картинку',
  })
  @IsString()
  @IsOptional()
  image?: string;

  @Field(() => Number)
  @ApiProperty({
    type: () => Number,
    example: '15000.30',
    description: 'Стоимость за один килограмм',
    required: true,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Boolean)
  @ApiProperty({
    type: () => Boolean,
    example: 'true',
    description: 'Можно ли сейчас заказать?',
    required: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;
}
