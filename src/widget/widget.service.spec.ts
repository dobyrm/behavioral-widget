import { Test, TestingModule } from '@nestjs/testing';
import { WidgetService } from './widget.service';
import * as fs from 'fs';

jest.mock('fs');

describe('WidgetService', () => {
  let service: WidgetService;
  const mockTemplate =
    'background-color: __BACKGROUND_COLOR__; color: __TEXT_COLOR__; websocket-url: __WEBSOCKET_URL__;';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WidgetService],
    }).compile();

    service = module.get<WidgetService>(WidgetService);

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockTemplate);
  });

  it('should generate the correct script for dark theme', () => {
    const script = service.getWidgetScript('dark');
    expect(script).toContain('background-color: #333;');
    expect(script).toContain('color: #fff;');
    expect(script).toContain('websocket-url: http://localhost:3000');
  });

  it('should generate the correct script for light theme', () => {
    const script = service.getWidgetScript('light');
    expect(script).toContain('background-color: #f9f9f9;');
    expect(script).toContain('color: #000;');
    expect(script).toContain('websocket-url: http://localhost:3000');
  });

  it('should log error and throw exception if reading file fails', () => {
    (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('File not found');
    });

    try {
      service.getWidgetScript('dark');
    } catch (e) {
      expect(e.message).toBe('Failed to generate widget script');
    }
  });
});
