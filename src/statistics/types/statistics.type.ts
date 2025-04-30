export type Name = {
  name: string;
};

export type Timestamp = {
  timestamp: number;
};

export type User = {
  ip: string;
};

export type Device = {
  browser: string;
  os: string;
  cookies: string;
};

export type Event = {
  [key: string]: any;
  type: string;
  timestamp: number;
};

export type TimeSpentMs = {
  timeSpentMs: number;
};

export type StatisticsData = object;
