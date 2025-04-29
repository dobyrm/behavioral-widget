import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  @SubscribeMessage('session-data')
  handleSessionData(@MessageBody() data) {
    console.log('Session data received:', data);

    return {
      event: 'behavior-data',
      data: {
        behavior: 'active',
      },
    };
  }

  @SubscribeMessage('user-behavior')
  handleUserBehavior(@MessageBody() data) {
    console.log('User behavior received:', {
      events: data.events,
      timeSpentMs: data.timeSpentMs,
      timestamp: data.timestamp,
    });

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
  handleFormSubmission(@MessageBody() data) {
    console.log('Form submitted:', data);

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
