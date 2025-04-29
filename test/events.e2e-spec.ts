import { io, Socket } from 'socket.io-client';

describe('Socket.IO Gateway', () => {
  let socket: Socket;

  beforeAll((done) => {
    socket = io(`http://localhost:${process.env.PORT || 3000}`, {
      transports: ['websocket'],
      upgrade: false,
    });

    socket.on('connect', () => {
      done();
    });

    socket.on('connect_error', (err) => {
      done(err);
    });
  });

  afterAll(() => {
    if (socket) {
      socket.disconnect();
    }
  });

  it('should handle "session-data" message and return "behavior-data"', (done) => {
    socket.emit('session-data', { someData: 'test' });

    socket.on(
      'behavior-data',
      (data: {
        activityLevel: string;
        behavior: string;
        timestamp: number;
      }) => {
        expect(data).toHaveProperty('activityLevel', 'high');
        expect(data).toHaveProperty('behavior', 'active');
        expect(data).toHaveProperty('timestamp');
        done();
      },
    );
  });
});
