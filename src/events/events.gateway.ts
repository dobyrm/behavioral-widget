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
import { DecisionEngineService } from '../decision-engine/decision-engine.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly decisionEngineService: DecisionEngineService,
  ) {}

  @WebSocketServer()
  @SubscribeMessage('session-data')
  handleSessionData(@MessageBody() data: ISessionDataPayload) {
    const sessionData = this.statisticsService.handleSessionData(data);
    const decisionResult =
      this.decisionEngineService.evaluateSessionData(sessionData);

    return {
      event: 'behavior-data',
      data: decisionResult,
    };
  }

  @SubscribeMessage('user-behavior')
  handleUserBehavior(@MessageBody() data: IUserBehaviorPayload) {
    const userBehaviorData = this.statisticsService.handleUserBehavior(data);
    const decisionResult =
      this.decisionEngineService.evaluateUserBehavior(userBehaviorData);

    return {
      event: 'behavior-data',
      data: decisionResult,
    };
  }

  @SubscribeMessage('form-submission')
  handleFormSubmission(@MessageBody() data: IFormDataPayload) {
    const formData = this.statisticsService.handleFormData(data);
    const decisionResult =
      this.decisionEngineService.evaluateFormData(formData);

    return {
      event: 'behavior-data',
      data: decisionResult,
    };
  }
}
