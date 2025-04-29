import { Injectable, Logger } from '@nestjs/common';
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
    'templates',
    'widget.template.js',
  );

  getWidgetScript(theme: string): string {
    try {
      const rawTemplate = fs.readFileSync(this.templatePath, 'utf-8');

      const backgroundColor = theme === 'dark' ? '#333' : '#f9f9f9';
      const textColor = theme === 'dark' ? '#fff' : '#000';
      const websocketUrl = 'http://localhost:3000';

      const finalScript = rawTemplate
        .replace('__BACKGROUND_COLOR__', backgroundColor)
        .replace('__TEXT_COLOR__', textColor)
        .replace('__WEBSOCKET_URL__', websocketUrl);

      return finalScript;
    } catch (error) {
      this.logger.error(`Failed to generate widget script. Error: ${error}`);
      throw new Error('Failed to generate widget script');
    }
  }
}
