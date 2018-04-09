import { RethinkDb } from './RethinkDb';
import * as WebSocket from 'ws';

export const WS_PORT: number = Number.parseFloat(process.env.WS_PORT) || 9898;
export class WebSocketServer {

    public websocket: any;
    //public rethinkDb: RethinkDb = new RethinkDb();

    constructor() {
    }

    initWebsocketServer() {
        this.websocket = new WebSocket.Server({ port: WS_PORT });
        console.log('WebSocketServer listening on Port: ' + WS_PORT);
        this.websocket.on('connection', (ws: WebSocket) => {

            //connection is up, let's add a simple simple event
            ws.on('message', (message: string) => {
                try {
                    const msg = JSON.parse(message);
                    console.log(msg.type);
                    switch (msg.type) {
                        case 'matchUpdated':
                        case 'pitchAdded':
                            this.broadcast(JSON.stringify(msg), ws);
                    }
                } catch {
                    console.log('error parsing message');
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
