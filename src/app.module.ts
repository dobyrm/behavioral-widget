import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { WidgetModule } from './widget/widget.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [GatewayModule, WidgetModule, EventsModule],
})
export class AppModule {}
