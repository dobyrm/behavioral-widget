import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  imports: [StatisticsModule],
  providers: [EventsGateway],
})
export class EventsModule {}
