import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/gateway.module';
import { ClientWidgetModule } from './client-widget/client-widget.module';
import { EventsModule } from './events/events.module';
import { StatisticsModule } from './statistics/statistics.module';

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
  ],
})
export class AppModule {}
