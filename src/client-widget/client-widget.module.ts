import { Module } from '@nestjs/common';
import { ClientWidgetService } from './client-widget.service';

@Module({
  providers: [ClientWidgetService],
  exports: [ClientWidgetService],
})
export class ClientWidgetModule {}
