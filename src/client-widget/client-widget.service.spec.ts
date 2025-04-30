import { Test, TestingModule } from '@nestjs/testing';
import { ClientWidgetService } from './client-widget.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { IClientWidgetRequest } from './interfaces/client-widget.interface';

jest.mock('fs');

describe('ClientWidgetService', () => {
  let service: ClientWidgetService;
  const mockTemplate =
    'background-color: __BACKGROUND_COLOR__; color: __TEXT_COLOR__; websocket-url: __WEBSOCKET_URL__;';

  const mockConfigService = {
    get: jest.fn().mockReturnValue(3000),
  };

  const createMockRequest = (theme: string): IClientWidgetRequest => ({
    getTheme: () => theme,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientWidgetService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<ClientWidgetService>(ClientWidgetService);

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockTemplate);
  });

  it('should generate the correct script for dark theme', () => {
    const data = createMockRequest('dark');
    const widget = service.getClientWidget(data);
    expect(widget.getScript()).toContain('background-color: #333;');
    expect(widget.getScript()).toContain('color: #fff;');
    expect(widget.getScript()).toContain(
      'websocket-url: http://localhost:3000',
    );
  });

  it('should generate the correct script for light theme', () => {
    const data = createMockRequest('light');
    const widget = service.getClientWidget(data);
    expect(widget.getScript()).toContain('background-color: #f9f9f9;');
    expect(widget.getScript()).toContain('color: #000;');
    expect(widget.getScript()).toContain(
      'websocket-url: http://localhost:3000',
    );
  });
});
