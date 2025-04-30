import { Name, Timestamp } from '../types/statistics.type';
export interface IFormDataPayload {
  name: Name;
  timestamp: Timestamp;
}

export interface IFormData {
  getName(): Name;
  getTimestamp(): Timestamp;
}
