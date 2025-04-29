import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { WidgetService } from './../src/widget/widget.service';
import { Server } from 'http';

describe('GatewayController (e2e)', () => {
  let app: INestApplication;
  let widgetService: WidgetService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    widgetService = moduleFixture.get<WidgetService>(WidgetService);
    await app.init();
  });

  it('/gateway/widget.js (GET)', async () => {
    const theme = 'dark';
    const script = widgetService.getWidgetScript(theme);

    const response = await request(app.getHttpServer() as Server)
      .get(`/gateway/widget.js?theme=${theme}`)
      .expect(200);

    expect(response.headers['content-type']).toMatch(/application\/javascript/);
    expect(response.text).toBe(script);
  });
});
