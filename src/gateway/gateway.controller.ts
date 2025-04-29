import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { WidgetService } from './../widget/widget.service';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get('widget.js')
  getWidgetJs(@Res() res: Response, @Query('theme') theme: string) {
    try {
      res.setHeader('Content-Type', 'application/javascript');

      const script = this.widgetService.getWidgetScript(theme || 'light');

      res.send(script);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
