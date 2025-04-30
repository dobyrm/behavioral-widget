import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import {
  IClientWidgetRequest,
  IClientWidget,
} from './interfaces/client-widget.interface';
import ClientWidgetDto from './dtos/client-widget.dto';

@Injectable()
export class ClientWidgetService {
  private readonly logger = new Logger(ClientWidgetService.name);
  private readonly templatePath = path.join(
    __dirname,
    '../../',
    'src',
    'client-widget',
    'scripts',
    'widget.js',
  );

  constructor(private configService: ConfigService) {}

  public getClientWidget(data: IClientWidgetRequest): IClientWidget {
    try {
      if (!fs.existsSync(this.templatePath)) {
        throw new Error('Template file not found');
      }

      const rawTemplate = fs.readFileSync(this.templatePath, 'utf-8');

      const backgroundColor = data.getTheme() === 'dark' ? '#333' : '#f9f9f9';
      const textColor = data.getTheme() === 'dark' ? '#fff' : '#000';

      const port = this.configService.get<number>('APP_PORT');
      if (!port) {
        throw new Error('APP_PORT is not defined in .env file');
      }
      const websocketUrl = `http://localhost:${port}`;

      const widgetScript = rawTemplate
        .replace('__BACKGROUND_COLOR__', backgroundColor)
        .replace('__TEXT_COLOR__', textColor)
        .replace('__WEBSOCKET_URL__', websocketUrl);

      return new ClientWidgetDto(widgetScript);
    } catch (error) {
      this.logger.error(
        `Failed to generate client widget script. Error: ${error.message}`,
      );
      throw new Error('Failed to generate client widget script');
    }
  }
}
