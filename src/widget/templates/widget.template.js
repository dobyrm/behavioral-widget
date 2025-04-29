(function () {
  console.log('Behavioral Widget initialized');

  const script = document.createElement('script');
  script.src = 'https://cdn.socket.io/4.7.2/socket.io.min.js';
  script.onload = initWidget;
  document.head.appendChild(script);

  const sessionData = {
    userId: getUserId(),
    ip: '',
    device: {
      browser: navigator.userAgent,
      os: navigator.platform,
    },
  };

  let socket;

  function initWidget() {
    const widgetContainer = document.createElement('div');
    widgetContainer.style.width = '200px';
    widgetContainer.style.zIndex = '111111';
    widgetContainer.style.border = '1px solid #ccc';
    widgetContainer.style.padding = '10px';
    widgetContainer.style.backgroundColor = '__BACKGROUND_COLOR__';
    widgetContainer.style.color = '__TEXT_COLOR__';
    widgetContainer.style.borderRadius = '8px';
    widgetContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    widgetContainer.style.position = 'absolute';
    widgetContainer.style.top = '10px';
    widgetContainer.style.right = '10px';
    widgetContainer.innerHTML = '<h3>Behavioral Insights</h3><div id="behavior-info">Waiting for data...</div>';

    document.body.appendChild(widgetContainer);

    socket = io('__WEBSOCKET_URL__');

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      sendSessionData(sessionData);
    });

    socket.on('behavior-data', (data) => {
      const behaviorInfo = widgetContainer.querySelector('#behavior-info');
      behaviorInfo.innerHTML =
        '<p>User Behavior: ' + data.behavior + '</p>' +
        '<p>Timestamp: ' + new Date(data.timestamp).toLocaleString() + '</p>' +
        '<p>Activity Level: ' + data.activityLevel + '</p>';

      if (data.action === 'displayForm') {
        displayForm(widgetContainer);
      }
    });

    socket.on('disconnect', () => {
      console.warn('Socket.IO disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO error:', error);
    });
  }

  function getUserId() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  }

  function getUserIP() {
    return fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        sessionData.ip = data.ip;
        sendSessionData(sessionData);
      })
      .catch(error => {
        console.error('IP fetch error:', error);
        sessionData.ip = 'Unknown';
        sendSessionData(sessionData);
      });
  }

  function sendSessionData(data) {
    if (socket && socket.connected) {
      socket.emit('session-data', data);
    }
  }

  function displayForm(container) {
    const form = document.createElement('form');
    form.innerHTML = '<h4>Fill out this form</h4><input type="text" placeholder="Your name" />';
    container.appendChild(form);
  }

  getUserIP();
})();
