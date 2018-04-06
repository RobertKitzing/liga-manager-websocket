"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class WebsocketServer {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new WebsocketServer().express;
//# sourceMappingURL=WebsocketServer.js.map