import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationRequestDto {

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: '1',
    description: 'Номер страницы',
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: '10',
    description: 'Ораничение на размер элементов на странице',
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
