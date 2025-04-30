import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { StatisticsModule } from '../statistics/statistics.module';
import { DecisionEngineModule } from '../decision-engine/decision-engine.module';

@Module({
  imports: [StatisticsModule, DecisionEngineModule],
  providers: [EventsGateway],
})
export class EventsModule {}
