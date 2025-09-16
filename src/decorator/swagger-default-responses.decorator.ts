import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '.././error-response.dto';

export function ApiDefaultErrorResponses() {
  return applyDecorators(
    ApiResponse({ status: 400, description: 'Некорректные данные', type: () => ErrorResponseDto}),
    ApiResponse({ status: 500, description: 'Ошибка сервера', type: () => ErrorResponseDto }),
    ApiResponse({ status: 404, description: 'Не найдено', type: () => ErrorResponseDto }),
  );
}
