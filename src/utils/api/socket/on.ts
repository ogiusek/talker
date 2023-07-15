import { socketListeners } from "./socketListeners";

function addSocketEvent(event: string, method: (data: any) => void) {
  socketListeners[event] = method;
}

export { addSocketEvent };
export default addSocketEvent;