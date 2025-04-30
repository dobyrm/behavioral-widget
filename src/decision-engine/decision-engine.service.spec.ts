import { Test, TestingModule } from '@nestjs/testing';
import { DecisionEngineService } from './decision-engine.service';
import SessionDataRule from './rules/session-data.rule';
import UserBehaviorRule from './rules/user-behavior.rule';
import FormDataRule from './rules/form-data.rule';
import { ISessionData } from '../statistics/interfaces/session-data.interface';
import { IUserBehavior } from '../statistics/interfaces/user-behavior.interface';
import { IFormData } from '../statistics/interfaces/form-data.interface';
import {
  User,
  Device,
  Event,
  Timestamp,
  TimeSpentMs,
  Name,
} from '../statistics/types/statistics.type';

describe('DecisionEngineService', () => {
  let service: DecisionEngineService;

  beforeEach(async () => {
    const sessionDataRule = { evaluate: jest.fn(() => true) };
    const userBehaviorRule = { evaluate: jest.fn(() => false) };
    const formDataRule = { evaluate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DecisionEngineService,
        { provide: SessionDataRule, useValue: sessionDataRule },
        { provide: UserBehaviorRule, useValue: userBehaviorRule },
        { provide: FormDataRule, useValue: formDataRule },
      ],
    }).compile();

    service = module.get<DecisionEngineService>(DecisionEngineService);
  });

  it('should evaluate session data', () => {
    const mockUser: User = { ip: '127.0.0.1' };
    const mockDevice: Device = {
      browser: 'Chrome',
      os: 'iOS',
      cookies: 'enabled',
    };

    const mockData: ISessionData = {
      getUser: () => mockUser,
      getDevice: () => mockDevice,
    };

    expect(service.evaluateSessionData(mockData)).toBe(true);
  });

  it('should evaluate user behavior', () => {
    const event: Event = {
      type: 'click',
      metadata: {},
      timestamp: Date.now(),
    };
    const timestamp: Timestamp = Date.now();
    const mockData: IUserBehavior = {
      getEvents: () => [event],
      getTimeSpentMs: () => 1500 as unknown as TimeSpentMs,
      getTimestamp: () => timestamp,
    };

    expect(service.evaluateUserBehavior(mockData)).toBe(false);
  });

  it('should evaluate form data', () => {
    const timestamp: Timestamp = Date.now();
    const mockData: IFormData = {
      getName: () => 'John Doe' as Name,
      getTimestamp: () => timestamp,
    };

    expect(service.evaluateFormData(mockData)).toBe(true);
  });
});
