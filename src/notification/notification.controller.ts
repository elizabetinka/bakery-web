import { ApiExcludeController } from '@nestjs/swagger';
import { SseService } from './notification.service';

import { Sse, Controller, Inject } from '@nestjs/common';

@Controller('notifications')
@ApiExcludeController()
export class SseController {
  constructor(@Inject(SseService) private readonly sseService: SseService) {}

  @Sse()
  doTheSse() {
    console.log('New SSE connection');
    return this.sseService.sendEvents();
  }
}
