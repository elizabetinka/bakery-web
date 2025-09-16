import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderDto {
  @Field(() => Number)
  @ApiProperty({
    type: () => Number,
    example: '10',
    description: 'id пользователя ',
    required: true,
  })
  @IsNumber()
  @Min(0)
  customer: number;
}
