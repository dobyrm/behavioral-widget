import { Theme, ClientWidgetScript } from '../types/client-widget.type';

export interface IClientWidgetRequest {
  getTheme(): Theme;
}

export interface IClientWidget {
  getScript(): ClientWidgetScript;
}
