import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { WidgetModule } from './../widget/widget.module';

@Module({
  imports: [WidgetModule],
  controllers: [GatewayController],
})
export class GatewayModule {}
