(() => {
  const sessionData = {
    ip: '',
    device: {
      browser: navigator.userAgent,
      os: navigator.platform,
      cookies: document.cookie,
    },
  };

  let socket;
  let startTime = Date.now();
  let behaviorEvents = [];

  const initWidget = () => {
    const widgetContainer = createWidgetContainer();
    document.body.appendChild(widgetContainer);

    socket = io('__WEBSOCKET_URL__');
    socket.on('connect', () => sendSessionData(sessionData));
    socket.on('behavior-data', handleBehaviorData(widgetContainer));
    socket.on('disconnect', () => console.warn('Socket.IO disconnected'));
    socket.on('connect_error', (error) => console.error('Socket.IO error:', error));

    trackUserBehavior();
    setInterval(sendBehaviorData, 10000);
  };

  const createWidgetContainer = () => {
    const container = document.createElement('div');
    Object.assign(container.style, {
      width: '200px',
      zIndex: '9999',
      border: '1px solid #ccc',
      padding: '10px',
      backgroundColor: '__BACKGROUND_COLOR__',
      color: '__TEXT_COLOR__',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      position: 'absolute',
      top: '10px',
      right: '10px',
    });
    container.innerHTML = '<h3>Behavioral Insights</h3><div id="behavior-info">Waiting for data...</div>';
    
    return container;
  };

  const handleBehaviorData = (container) => (data) => {
    const behaviorInfo = container.querySelector('#behavior-info');
  
    if (!data || Object.keys(data).length === 0) {
      console.warn('Empty behavior-data payload received.');
      return;
    }
  
    const { behavior, timestamp, activityLevel, action } = data;
    const lines = [];
  
    if (behavior) lines.push(`<p>User Behavior: ${behavior}</p>`);
    if (timestamp) lines.push(`<p>Timestamp: ${new Date(timestamp).toLocaleString()}</p>`);
    if (activityLevel) lines.push(`<p>Activity Level: ${activityLevel}</p>`);
  
    behaviorInfo.innerHTML = lines.join('') || '<p>No valid behavior data.</p>';
  
    if (action === 'displayForm') {
      displayForm(container);
    } else if (action === 'showBanner') {
      showBanner();
    }
  };

  const displayForm = (container) => {
    if (container.querySelector('form')) return;

    const form = createForm();
    container.appendChild(form);
  };

  const createForm = () => {
    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '8px';
    form.style.marginTop = '10px';

    const heading = document.createElement('h4');
    heading.textContent = 'Fill out this form';
    heading.style.margin = '0';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'name';
    input.placeholder = 'Your name';
    input.required = true;
    Object.assign(input.style, {
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    });

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Submit';
    Object.assign(button.style, {
      padding: '8px 12px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    });

    button.addEventListener('mouseover', () => button.style.backgroundColor = '#45a049');
    button.addEventListener('mouseout', () => button.style.backgroundColor = '#4CAF50');

    form.appendChild(heading);
    form.appendChild(input);
    form.appendChild(button);
    form.addEventListener('submit', (e) => handleFormSubmit(e, form, input));

    return form;
  };

  const handleFormSubmit = (event, form, input) => {
    event.preventDefault();
    const name = input.value;

    if (socket && socket.connected) {
      socket.emit('form-submission', { name, timestamp: Date.now() });
    }

    form.innerHTML = '';
  };

  const showBanner = () => {
    if (document.querySelector('.promo-banner')) return;
  
    const banner = createBanner();
    document.body.appendChild(banner);

  };
  
  const createBanner = () => {
    const banner = document.createElement('div');
    banner.classList.add('promo-banner');
    
    Object.assign(banner.style, {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '10px',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      fontSize: '14px',
      width: 'auto',
      maxWidth: '350px',
      zIndex: '9999',
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      textAlign: 'center',
    });
  
    banner.textContent = 'This is a promotional banner!';
  
    return banner;
  };

  const trackUserBehavior = () => {
    document.addEventListener('mousemove', (e) => recordBehaviorEvent('mousemove', e.clientX, e.clientY));
    document.addEventListener('click', (e) => recordBehaviorEvent('click', e.clientX, e.clientY, e.target.tagName));
    document.addEventListener('scroll', () => recordBehaviorEvent('scroll', window.scrollY));
     
    window.addEventListener('beforeunload', sendBehaviorData);
  };

  const recordBehaviorEvent = (type, ...args) => {
    behaviorEvents.push({ type, timestamp: Date.now(), ...args });
  };

  const sendBehaviorData = () => {
    if (socket && socket.connected && behaviorEvents.length > 0) {
      const timeSpent = Date.now() - startTime;
      socket.emit('user-behavior', {
        events: [...behaviorEvents],
        timeSpentMs: timeSpent,
        timestamp: Date.now(),
      });
      behaviorEvents = [];
    }
  };

  const sendSessionData = (data) => {
    if (socket && socket.connected) {
      socket.emit('session-data', data);
    }
  };

  const getUserIP = () => {
    return fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        sessionData.ip = data.ip;
        sendSessionData(sessionData);
      })
      .catch((error) => {
        console.error('IP fetch error:', error);
        sessionData.ip = 'Unknown';
        sendSessionData(sessionData);
      });
  };

  const loadSocketAndScripts = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.socket.io/4.7.2/socket.io.min.js';
    script.onload = () => initWidget();
    document.head.appendChild(script);
  };

  loadSocketAndScripts();
  getUserIP();
})();
