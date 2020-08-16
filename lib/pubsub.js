"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubsubConnection = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
class PubsubConnection {
    constructor(options) {
        this.options = options;
    }
    open() {
        this.client = new pubsub_1.PubSub(this.options);
    }
    close() {
        this.client.close();
    }
}
exports.PubsubConnection = PubsubConnection;
