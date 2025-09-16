import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SseService {
  private events = new Subject<MessageEvent>();

  addEvent(payload: { type: string; data: any }) {
    this.events.next({
      data: JSON.stringify(payload),
    } as MessageEvent);
  }

  sendEvents() {
    return this.events.asObservable();
  }
}
