"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubsubWatcher = void 0;
const pubsub_1 = require("./pubsub");
class PubsubWatcher {
    constructor(options, topicName, subscriptionName) {
        this.topicName = topicName || 'casbin';
        this.subscriptionName = subscriptionName || 'sub_casbin';
        this.pubsubConnection = new pubsub_1.PubsubConnection(options);
        this.pubsubConnection.open();
        this.subscription = this.pubsubConnection.client.topic(this.topicName).subscription(this.subscriptionName);
        this.subscription.on('message', this.messageHandler.bind(this));
    }
    static newWatcher(options, topicName, subscriptionName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new PubsubWatcher(options, topicName, subscriptionName);
        });
    }
    messageHandler(message) {
        console.log(`Debug: message ID: ${message.id}`);
        message.ack();
        if (this.callback)
            this.callback();
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pubsubConnection.client.topic(this.topicName).publishMessage({ data: Buffer.from('casbin updated') });
            return true;
        });
    }
    setUpdateCallback(callback) {
        this.callback = callback;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subscription.removeListener('message', this.callback.bind(this));
            this.pubsubConnection.close();
        });
    }
}
exports.PubsubWatcher = PubsubWatcher;
