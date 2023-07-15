interface ISocketListeners {
  [key: string]: (data: any) => void;
}

const socketListeners: ISocketListeners = {};

export { socketListeners };