import { io, Socket } from 'socket.io-client';

describe('Socket.IO Gateway', () => {
  let socket: Socket;

  beforeAll((done) => {
    socket = io('http://localhost:3000', {
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
    const payload = {
      user: {
        ip: '127.0.0.1',
      },
      device: {
        browser: 'Chrome',
      },
    };

    socket.emit('session-data', payload);

    socket.once('behavior-data', (data: { behavior: string }) => {
      expect(data).toHaveProperty('behavior', 'active');
      done();
    });
  });
});
