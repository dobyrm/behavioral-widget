import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ClientWidgetService } from '../src/client-widget/client-widget.service';
import { Server } from 'http';

describe('GatewayController', () => {
  let app: INestApplication;
  let widgetService: ClientWidgetService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    widgetService = moduleFixture.get<ClientWidgetService>(ClientWidgetService);
    await app.init();
  });

  it('should return the correct widget script based on theme', async () => {
    const theme = 'dark';
    const mockRequest = { getTheme: () => theme };
    const script = widgetService.getClientWidget(mockRequest).getScript();

    const response = await request(app.getHttpServer() as Server)
      .get(`/gateway/widget.js?theme=${theme}`)
      .expect(200);

    expect(response.headers['content-type']).toMatch(/application\/javascript/);
    expect(response.text).toBe(script);
  });
});
