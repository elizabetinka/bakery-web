import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SseService {
  private events = new Subject<MessageEvent>();

  addEvent(payload: { type: string; data: any }) {
    console.log('Adding event:', payload);
    this.events.next({
      data: JSON.stringify(payload),
    } as MessageEvent);
  }

  sendEvents() {
    console.log('Sending events to client ');
    return this.events.asObservable();
  }
}
