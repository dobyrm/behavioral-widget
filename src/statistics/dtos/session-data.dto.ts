import { IStatisticsData } from '../interfaces/statistics-data.interface';
import {
  IUser,
  IDevice,
  ISessionData,
} from '../interfaces/session-data.interface';

class SessionDataDto implements ISessionData, IStatisticsData {
  constructor(
    private readonly user: IUser,
    private readonly device: IDevice,
  ) {}

  getUser(): IUser {
    return this.user;
  }

  getDevice(): IDevice {
    return this.device;
  }
}

export default SessionDataDto;
