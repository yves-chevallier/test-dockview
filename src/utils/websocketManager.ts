type Command = { [key: string]: any };

type MessageCallback = (msg: any) => void;

export class WebSocketManager {
  private socket: WebSocket | null = null;
  private listeners: MessageCallback[] = [];

  connect(url: string) {
    if (this.socket) return;

    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      this.listeners.forEach((cb) => cb(msg));
    };

    this.socket.onclose = () => {
      this.socket = null;
    };
  }

  send(command: Command) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    this.socket.send(JSON.stringify(command));
  }

  onMessage(cb: MessageCallback) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((f) => f !== cb);
    };
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }
}

export const wsManager = new WebSocketManager();
