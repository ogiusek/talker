import { socketListeners } from "./socketListeners";
import { url } from "../";

const newSocket = () => new WebSocket(`ws://${url}`);

const recconectDelay = 60 * 1000;
let socket = newSocket();

const defineSocket = () => {
  socket.addEventListener('open', (_) => {
    console.log('WebSocket connection established');
  });

  socket.addEventListener('message', (jsonData) => {
    const rawData = JSON.parse(jsonData.data);
    console.log(rawData);
    const eventName = rawData.event;
    const data = rawData.data;
    const eventHandler = socketListeners[eventName];

    eventHandler && eventHandler(data);
  });

  socket.addEventListener('close', (_) => {
    console.log('WebSocket connection closed');
    setTimeout(() => {
      try {
        socket = newSocket();
        defineSocket();
      } catch (e) { }
    }, recconectDelay);
  });

  socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  });
}

defineSocket();

const getSocket = async () => {
  if (socket.readyState === WebSocket.OPEN) {
    return socket;
  } else {
    await new Promise((resolve) => {
      socket.addEventListener('open', resolve);
    });
    return socket;
  }
}

export { getSocket, socketListeners };