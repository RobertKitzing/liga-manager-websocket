import * as WebSocket from 'ws';
import { Authentication } from './authentication';

function verifyClient(info, next) {
    console.log(info);
    next(false);
}
export const WS_PORT: number = Number.parseFloat(process.env.WS_PORT) || 9898;
export class WebSocketServer {

    public websocket: any;
    private auth: Authentication = new Authentication();
    
    constructor() {
        this.initWebsocketServer();
    }

    initWebsocketServer() {
        this.websocket = new WebSocket.Server({ 
            port: WS_PORT,
            verifyClient : (info, next) => {
                next(this.auth.isAuthenticated(info));
            }
        });
        console.log('WebSocketServer listening on Port: ' + WS_PORT);
        this.websocket.on('connection', (ws: WebSocket) => {
            ws.on('message', (message: string) => {
                console.log('received: %s', message);
                try {
                    const msg = JSON.parse(message);
                    if (!this.auth.isAuthenticated(msg.token)) {
                        ws.close();
                    }
                    console.log(msg.type);
                    switch (msg.type) {
                        case 'matchUpdated':
                        case 'pitchAdded':
                            this.broadcast(JSON.stringify(msg), ws);
                            break;
                    }
                } catch {
                    console.log('error parsing message');
                }
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
