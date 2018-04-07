import * as WebSocket from 'ws';

export const WS_PORT: number = Number.parseFloat(process.env.WS_PORT) || 9898;
class WebSocketServer {

    public websocket: any;

    constructor() {
    }

    initWebsocketServer() {
        this.websocket = new WebSocket.Server({ port: WS_PORT });
        this.websocket.on('connection', (ws: WebSocket) => {

            //connection is up, let's add a simple simple event
            ws.on('message', (message: string) => {
                const msg = JSON.parse(message);
                console.log(msg.type);
                switch (msg.type) {
                    case 'matchUpdated':
                    case 'pitchAdded':
                        this.broadcast(JSON.stringify(msg), ws);
                }
                //log the received message and send it back to the client
                console.log('received: %s', message);
            });
        });
    }

    broadcast(message: string, self?: WebSocket) {
        console.log('broadcasting', message);
        this.websocket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && self && self !== client) {
                client.send(message);
            }
        });
    }
}
