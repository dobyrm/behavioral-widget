import { User, Device } from '../types/statistics.type';

export interface ISessionDataPayload {
  user: User;
  device: Device;
}

export interface ISessionData {
  getUser(): User;
  getDevice(): Device;
}
