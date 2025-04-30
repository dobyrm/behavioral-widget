import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/gateway.module';
import { ClientWidgetModule } from './client-widget/client-widget.module';
import { EventsModule } from './events/events.module';
import { StatisticsModule } from './statistics/statistics.module';
import { DecisionEngineModule } from './decision-engine/decision-engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot(),
    GatewayModule,
    ClientWidgetModule,
    EventsModule,
    StatisticsModule,
    DecisionEngineModule,
  ],
})
export class AppModule {}
