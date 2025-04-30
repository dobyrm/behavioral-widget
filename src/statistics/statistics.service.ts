import { Injectable, Logger } from '@nestjs/common';
import { IStatisticsData } from './interfaces/statistics-data.interface';
import SessionDataDto from './dtos/session-data.dto';
import UserBehaviorDto from './dtos/user-behavior.dto';
import FormSubmissionDto from './dtos/form-data.dto';
import {
  ISessionDataPayload,
  ISessionData,
} from './interfaces/session-data.interface';
import {
  IUserBehaviorPayload,
  IUserBehavior,
} from './interfaces/user-behavior.interface';
import { IFormDataPayload, IFormData } from './interfaces/form-data.interface';

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);

  public handleSessionData(payload: ISessionDataPayload): ISessionData {
    const data = new SessionDataDto(payload.user, payload.device);
    this.save(data);

    return data;
  }

  public handleUserBehavior(payload: IUserBehaviorPayload): IUserBehavior {
    const data = new UserBehaviorDto(
      payload.events,
      payload.timeSpentMs,
      payload.timestamp,
    );
    this.save(data);

    return data;
  }

  public handleFormData(payload: IFormDataPayload): IFormData {
    const data = new FormSubmissionDto(payload.name, payload.timestamp);
    this.save(data);

    return data;
  }

  private save(data: IStatisticsData) {
    this.logger.debug(data);
  }
}
