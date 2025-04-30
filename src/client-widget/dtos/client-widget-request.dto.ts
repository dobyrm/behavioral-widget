import { IClientWidgetRequest } from '../interfaces/client-widget.interface';
import { Theme } from '../types/client-widget.type';

class ClientWidgetRequestDto implements IClientWidgetRequest {
  constructor(private readonly theme: Theme) {}

  public getTheme(): Theme {
    return this.theme;
  }
}

export default ClientWidgetRequestDto;
