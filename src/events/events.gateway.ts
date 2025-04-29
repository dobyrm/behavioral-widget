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
  handleSessionData(@MessageBody() data: any) {
    console.log('Session data received:', data);

    return {
      event: 'behavior-data',
      data: {
        behavior: 'active',
        timestamp: Date.now(),
        activityLevel: 'high',
      },
    };
  }
}
