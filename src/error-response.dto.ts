import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    type: () => Number,
    example: '400',
    description: 'Cтатус ответа',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    type: () => String,
    example: 'Неверные данные',
    description: 'Сообщение с ошибкой',
    required: true,
  })
  message: string;

  @ApiProperty({
    type: () => String,
    example: '/api/users',
    description: 'Путь по которому случилась ошибка',
  })
  path: string;

  @ApiProperty({
    type: () => String,
    example: '2023-11-21T12:00:00.000Z',
    description: 'Время ошибки',
  })
  timestamp: string;
}
