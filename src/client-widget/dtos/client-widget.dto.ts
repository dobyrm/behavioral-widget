import { IClientWidget } from '../interfaces/client-widget.interface';
import { ClientWidgetScript } from '../types/client-widget.type';

class ClientWidgetDto implements IClientWidget {
  constructor(private readonly script: ClientWidgetScript) {}

  public getScript(): ClientWidgetScript {
    return this.script;
  }
}

export default ClientWidgetDto;
