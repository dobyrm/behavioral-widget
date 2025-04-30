import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StatisticsService } from '../statistics/statistics.service';
import { ISessionDataPayload } from '../statistics/interfaces/session-data.interface';
import { IFormDataPayload } from '../statistics/interfaces/form-data.interface';
import { IUserBehaviorPayload } from '../statistics/interfaces/user-behavior.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly statisticsService: StatisticsService) {}

  @WebSocketServer()
  @SubscribeMessage('session-data')
  handleSessionData(@MessageBody() data: ISessionDataPayload) {
    const sessionData = this.statisticsService.handleSessionData(data);
    console.log(sessionData);

    return {
      event: 'behavior-data',
      data: {
        behavior: 'active',
      },
    };
  }

  @SubscribeMessage('user-behavior')
  handleUserBehavior(@MessageBody() data: IUserBehaviorPayload) {
    const userBehaviorData = this.statisticsService.handleUserBehavior(data);
    console.log(userBehaviorData);

    return {
      event: 'behavior-data',
      data: {
        behavior: 'analyzed',
        timestamp: Date.now(),
        activityLevel: 'medium',
        action: 'displayForm',
      },
    };
  }

  @SubscribeMessage('form-submission')
  handleFormSubmission(@MessageBody() data: IFormDataPayload) {
    const formData = this.statisticsService.handleFormData(data);
    console.log(formData);

    return {
      event: 'behavior-data',
      data: {
        behavior: 'approved',
        timestamp: Date.now(),
        activityLevel: 'high',
        action: 'showBanner',
      },
    };
  }
}
