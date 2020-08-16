import { PubSub, ClientConfig } from '@google-cloud/pubsub';
export declare class PubsubConnection {
    private readonly options?;
    client: PubSub;
    constructor(options?: ClientConfig);
    open(): void;
    close(): void;
}
