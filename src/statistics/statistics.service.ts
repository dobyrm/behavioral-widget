import { Injectable, Logger } from '@nestjs/common';
import { StatisticsData } from './types/statistics.type';
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
    try {
      const data = new SessionDataDto(payload.user, payload.device);
      this.store(data);

      return data;
    } catch (error) {
      this.logger.error(
        `Failed to process session data. Error: ${error.message}`,
      );
      throw new Error('Failed to process session data');
    }
  }

  public handleUserBehavior(payload: IUserBehaviorPayload): IUserBehavior {
    try {
      const data = new UserBehaviorDto(
        payload.events,
        payload.timeSpentMs,
        payload.timestamp,
      );
      this.store(data);

      return data;
    } catch (error) {
      this.logger.error(
        `Failed to process user behavior data. Error: ${error.message}`,
      );
      throw new Error('Failed to process user behavior data');
    }
  }

  public handleFormData(payload: IFormDataPayload): IFormData {
    try {
      const data = new FormSubmissionDto(payload.name, payload.timestamp);
      this.store(data);

      return data;
    } catch (error) {
      this.logger.error(
        `Failed to process form submission data. Error: ${error.message}`,
      );
      throw new Error('Failed to process form submission data');
    }
  }

  private store(data: StatisticsData): void {
    try {
      this.logger.debug(data);
    } catch (error) {
      this.logger.error(`Failed to save data. Error: ${error.message}`);
      throw new Error('Failed to save data');
    }
  }
}
