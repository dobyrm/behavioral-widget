import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WidgetService {
  private readonly logger = new Logger(WidgetService.name);
  private readonly templatePath = path.join(
    __dirname,
    '../../',
    'src',
    'widget',
    'client-scripts',
    'client.widget.script.js',
  );

  constructor(private configService: ConfigService) {}

  getWidgetScript(theme: string): string {
    try {
      if (!fs.existsSync(this.templatePath)) {
        throw new Error('Template file not found');
      }

      const rawTemplate = fs.readFileSync(this.templatePath, 'utf-8');

      const backgroundColor = theme === 'dark' ? '#333' : '#f9f9f9';
      const textColor = theme === 'dark' ? '#fff' : '#000';

      const port = this.configService.get<number>('APP_PORT');
      if (!port) {
        throw new Error('APP_PORT is not defined in .env file');
      }
      const websocketUrl = `http://localhost:${port}`;

      const finalScript = rawTemplate
        .replace('__BACKGROUND_COLOR__', backgroundColor)
        .replace('__TEXT_COLOR__', textColor)
        .replace('__WEBSOCKET_URL__', websocketUrl);

      return finalScript;
    } catch (error) {
      this.logger.error(
        `Failed to generate widget script. Error: ${error.message}`,
      );
      throw new Error('Failed to generate widget script');
    }
  }
}
