import { Event, TimeSpentMs, Timestamp } from '../types/statistics.type';

export interface IUserBehaviorPayload {
  events: Event[];
  timeSpentMs: TimeSpentMs;
  timestamp: Timestamp;
}

export interface IUserBehavior {
  getEvents(): Event[];
  getTimeSpentMs(): TimeSpentMs;
  getTimestamp(): Timestamp;
}
