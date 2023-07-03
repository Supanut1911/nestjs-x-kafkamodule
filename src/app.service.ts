import { Injectable, Param } from '@nestjs/common';
import { log } from 'console';
import { SubscribeTo } from 'kafka/kafka.decorator';
import { KafkaPayload } from 'kafka/kafka.message';
import { KafkaService } from 'kafka/kafka.service';

interface Subpayload {
  x: number;
  y: number;
}

@Injectable()
export class AppService {
  constructor(private readonly kafkaService: KafkaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @SubscribeTo('need-sub-from-appY')
  handleSub(receivePayload: Subpayload) {
    console.log('kafkaserivce =>', this.kafkaService);

    try {
      console.log(
        'yyyyyyyyyyyyyyyyyy[KAKFA-CONSUMER] Print message after receiving',
        receivePayload,
      );

      //deconstructure and assign
      const x = receivePayload.x;
      const y = receivePayload.y;

      //process business logic
      const result = x - y;

      const message = { result };

      const payload: KafkaPayload = {
        messageId: '' + new Date().valueOf(),
        body: message,
        messageType: 'process from app YYYYYYYY',
        topicName: 'hello.topic',
      };
      console.log('check1');
      console.log('kafka', this.kafkaService);
      this.kafkaService.sendMessage('need-back-sub-result-to-appX', payload);
      console.log('check2');
      console.log('send result sub back to app XXXXX success');
    } catch (error) {
      console.error('fail to send message back to app XXXXXXXX =>', error);
    }
  }

  async getTest() {
    const message = {
      value: 'Message send to Kakfa Topic',
    };
    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: message,
      messageType: 'Say.Hello',
      topicName: 'hello.topic',
    };
    const value = await this.kafkaService.sendMessage('hello.topic', payload);
    console.log('kafka status ', value);
    return message;
  }
}
