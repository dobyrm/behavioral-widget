export interface IUser {
  ip: string;
}

export interface IDevice {
  browser: string;
  os: string;
  cookies: string;
}

export interface ISessionDataPayload {
  user: IUser;
  device: IDevice;
}

export interface ISessionData {
  getUser(): IUser;
  getDevice(): IDevice;
}
