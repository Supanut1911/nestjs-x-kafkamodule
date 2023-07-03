import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from 'kafka/kafka.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    KafkaModule.register({
      clientId: 'nestjs-appY-kafkaModule',
      brokers: [
        process.env.KAFKA_BROKER_1,
        // process.env.KAFKA_BROKER_2,
        // process.env.KAFKA_BROKER_3,
      ],
      groupId: 'appYYYYYYYY.kafkaModule-consumer-group',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
