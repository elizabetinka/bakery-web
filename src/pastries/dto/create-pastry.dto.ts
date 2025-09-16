import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreatePastryDto {

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
      'https://s.iimg.su/s/19/7b2FdwRxSvnXGgzn2IG4XzU2gaSuUDCNQw4fBfIy.jpg',
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
