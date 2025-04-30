export interface IEvent {
  [key: string]: any;
  type: string;
  timestamp: number;
}

export interface ITimeSpentMs {
  timeSpentMs: number;
}

export interface ITimestamp {
  timestamp: number;
}

export interface IUserBehaviorPayload {
  events: IEvent[];
  timeSpentMs: ITimeSpentMs;
  timestamp: ITimestamp;
}

export interface IUserBehavior {
  getEvents(): IEvent[];
  getTimeSpentMs(): ITimeSpentMs;
  getTimestamp(): ITimestamp;
}
