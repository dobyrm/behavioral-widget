export interface IName {
  name: string;
}

export interface ITimestamp {
  timestamp: number;
}

export interface IFormDataPayload {
  name: IName;
  timestamp: ITimestamp;
}

export interface IFormData {
  getName(): IName;
  getTimestamp(): ITimestamp;
}
