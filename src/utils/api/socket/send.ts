import { getSocket } from "./socket";

function sendSocket(event: string, data: any) {
  try {
    const send = async () => {
      const socket = await getSocket();
      socket.send(JSON.stringify({ event: event, data: data }));
    }
    send();
  } catch (err) {
    console.log('errSend', err);
  }
}

export { sendSocket };
export default sendSocket;