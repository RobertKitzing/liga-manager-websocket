"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebsocketServer_1 = require("./WebsocketServer");
const port = process.env.PORT || 3000;
WebsocketServer_1.default.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map