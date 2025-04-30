import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClientWidgetService } from '../client-widget/client-widget.service';
import ClientWidgetRequestDto from '../client-widget/dtos/client-widget-request.dto';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly widgetService: ClientWidgetService) {}

  @Get('widget.js')
  public getClientWidget(
    @Res() res: Response,
    @Query('theme') theme: string = 'light',
  ) {
    try {
      res.setHeader('Content-Type', 'application/javascript');

      const clientWidgetRequest = new ClientWidgetRequestDto(theme);
      const clientWidget =
        this.widgetService.getClientWidget(clientWidgetRequest);

      res.send(clientWidget.getScript());
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
