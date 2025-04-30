import { IStatisticsData } from '../interfaces/statistics-data.interface';
import {
  IEvent,
  ITimeSpentMs,
  ITimestamp,
  IUserBehavior,
} from '../interfaces/user-behavior.interface';

class UserBehaviorDto implements IUserBehavior, IStatisticsData {
  constructor(
    private readonly events: IEvent[],
    private readonly timeSpentMs: ITimeSpentMs,
    private readonly timestamp: ITimestamp,
  ) {}

  getEvents(): IEvent[] {
    return this.events;
  }

  getTimeSpentMs(): ITimeSpentMs {
    return this.timeSpentMs;
  }

  getTimestamp(): ITimestamp {
    return this.timestamp;
  }
}

export default UserBehaviorDto;
