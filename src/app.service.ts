import { Injectable, Param } from '@nestjs/common';
import { SubscribeTo } from 'kafka/kafka.decorator';
import { KafkaPayload } from 'kafka/kafka.message';

interface Subpayload {
  x: number;
  y: number;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @SubscribeTo('need-sub-from-appY')
  helloSubscriber(payload: Subpayload) {
    console.log('[KAKFA-CONSUMER] Print message after receiving', payload);
  }
}
