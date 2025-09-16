import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class UpdateOrderItemDto {
  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: '10',
    description: 'id заказа',
    required: true,
  })
  @IsNumber()
  @Min(0)
  orderId: number;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: '10',
    description: 'id торта',
    required: true,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  cakeId: number | undefined;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: '10',
    description: 'id пироженого',
    required: true,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  patsyId?: number;

  @Field(() => Int)
  @ApiProperty({
    type: () => Number,
    example: '10',
    description: 'Количество',
    required: true,
    default: 1,
  })
  @IsNumber()
  @Min(0)
  quantity: number = 1;
}
