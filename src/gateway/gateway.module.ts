import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ClientWidgetModule } from '../client-widget/client-widget.module';

@Module({
  imports: [ClientWidgetModule],
  controllers: [GatewayController],
})
export class GatewayModule {}
