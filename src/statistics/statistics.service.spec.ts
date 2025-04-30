import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import SessionDataDto from './dtos/session-data.dto';
import UserBehaviorDto from './dtos/user-behavior.dto';
import FormSubmissionDto from './dtos/form-data.dto';

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatisticsService],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle session data correctly', () => {
    const payload = {
      user: { ip: '127.0.0.1' },
      device: {
        browser: 'Chrome',
        os: 'Windows',
        cookies: 'some_cookie_value',
      },
    };
    const result = service.handleSessionData(payload);

    expect(result).toBeInstanceOf(SessionDataDto);
    expect(result.getUser().ip).toEqual(payload.user.ip);
    expect(result.getDevice().browser).toEqual(payload.device.browser);
  });

  it('should handle user behavior correctly', () => {
    const payload = {
      events: [{ type: 'mousemove', timestamp: 1746003481833 }],
      timeSpentMs: { timeSpentMs: 500 },
      timestamp: { timestamp: 1746003481833 },
    };
    const result = service.handleUserBehavior(payload);

    expect(result).toBeInstanceOf(UserBehaviorDto);
    expect(result.getEvents().length).toBeGreaterThan(0);
    expect(result.getTimeSpentMs().timeSpentMs).toEqual(
      payload.timeSpentMs.timeSpentMs,
    );
  });

  it('should handle form data correctly', () => {
    const payload = {
      name: { name: 'Test Form' },
      timestamp: { timestamp: 1746003481833 },
    };
    const result = service.handleFormData(payload);

    expect(result).toBeInstanceOf(FormSubmissionDto);
    expect(result.getName().name).toEqual(payload.name.name);
    expect(result.getTimestamp().timestamp).toEqual(
      payload.timestamp.timestamp,
    );
  });
});
