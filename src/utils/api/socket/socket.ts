import { socketListeners } from "./socketListeners";
import { url } from "../";

const reconnectDelay = 60 * 1000;
const newSocket = (): WebSocket => {
  return new WebSocket(`ws://${url}`);
};

let socket = newSocket();

const defineSocket = async () => {
  const sock = socket;
  sock.addEventListener('open', (_) => {
    // console.log('WebSocket connection established');
    sock.send(JSON.stringify({
      event: "login", data: {
        "login": localStorage.getItem('login'),
        "hash": localStorage.getItem('password')
      }
    }));
  });

  sock.addEventListener('message', (jsonData) => {
    const rawData = JSON.parse(jsonData.data);
    // console.log(rawData);
    const eventName = rawData.event;
    const data = rawData.data;
    const eventHandler = socketListeners[eventName];

    eventHandler && eventHandler(data);
  });

  sock.addEventListener('close', (_) => {
    // console.log('WebSocket connection closed');
    setTimeout(() => {
      try {
        socket = newSocket();
        defineSocket();
      } catch (e) { }
    }, reconnectDelay);
  });

  sock.addEventListener('error', (event) => {
    event.preventDefault();
    console.error('WebSocket error:', event);
  });
}

defineSocket();

const getSocket = async () => {
  const sock = socket;
  if (sock.readyState === WebSocket.OPEN) {
    return sock;
  } else {
    await new Promise((resolve) => {
      sock.addEventListener('open', resolve);
    });
    return sock;
  }
}

export { getSocket, socketListeners };