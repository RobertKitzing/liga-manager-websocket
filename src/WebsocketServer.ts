import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

class WebsocketServer {

  public express: any;
  public server: any;
  public websocket: any;

  constructor() {
    this.express = express();
    this.initWebsocketServer();
  }

  initWebsocketServer() {
    const server = http.createServer(this.express);
    this.server = server;
    this.websocket = new WebSocket.Server({ server });
    this.websocket.on('connection', (ws: WebSocket) => {

      //connection is up, let's add a simple simple event
      ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
      });

      //send immediatly a feedback to the incoming connection    
      ws.send('Hi there, I am a WebSocket server');
    });
  }
}

export default new WebsocketServer().server;