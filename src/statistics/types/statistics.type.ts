export type Name = string;
export type Timestamp = number;
export type TimeSpentMs = Timestamp;

export type User = {
  ip: string;
};

export type Device = {
  browser: string;
  os: string;
  cookies: string;
};

export type Event = {
  type: string;
  timestamp: Timestamp;
  [key: string]: any;
};

export type StatisticsData = object;
