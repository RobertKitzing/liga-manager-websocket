import * as WebSocket from 'ws';

export class Authentication {
    
    private key: string = "123456";


    constructor() {

    }

    isAuthenticated(info: any) {
        // Can Check Origin
        console.log(info.origin);
        console.log(info.req.headers['sec-websocket-protocol']);

        return info.req.headers['sec-websocket-protocol'] == '12345678';
    }
}