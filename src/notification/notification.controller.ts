import { SseService } from './notification.service';

import { Sse, Controller, Inject } from '@nestjs/common';

@Controller('notifications')
export class SseController {
  constructor(@Inject(SseService) private readonly sseService: SseService) {}

  @Sse()
  doTheSse() {
    console.log('New SSE connection');
    return this.sseService.sendEvents();
  }
}
