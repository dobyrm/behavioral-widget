import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/gateway.module';
import { WidgetModule } from './widget/widget.module';
import { EventsModule } from './events/events.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot(),
    GatewayModule,
    WidgetModule,
    EventsModule,
    StatisticsModule,
  ],
})
export class AppModule {}
