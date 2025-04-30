import { User, Device } from '../types/statistics.type';
import { ISessionData } from '../interfaces/session-data.interface';

class SessionDataDto implements ISessionData {
  constructor(
    private readonly user: User,
    private readonly device: Device,
  ) {}

  public getUser(): User {
    return this.user;
  }

  public getDevice(): Device {
    return this.device;
  }
}

export default SessionDataDto;
