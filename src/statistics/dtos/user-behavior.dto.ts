import { Event, TimeSpentMs, Timestamp } from '../types/statistics.type';
import { IUserBehavior } from '../interfaces/user-behavior.interface';

class UserBehaviorDto implements IUserBehavior {
  constructor(
    private readonly events: Event[],
    private readonly timeSpentMs: TimeSpentMs,
    private readonly timestamp: Timestamp,
  ) {}

  public getEvents(): Event[] {
    return this.events;
  }

  public getTimeSpentMs(): TimeSpentMs {
    return this.timeSpentMs;
  }

  public getTimestamp(): Timestamp {
    return this.timestamp;
  }
}

export default UserBehaviorDto;
