import { Watcher } from 'casbin';
import { ClientConfig } from '@google-cloud/pubsub';
export declare class PubsubWatcher implements Watcher {
    private topicName;
    private subscriptionName;
    private subscription;
    private pubsubConnection;
    private callback;
    static newWatcher(options?: ClientConfig, topicName?: string, subscriptionName?: string): Promise<PubsubWatcher>;
    private constructor();
    private messageHandler;
    update(): Promise<boolean>;
    setUpdateCallback(callback: () => void): void;
    close(): Promise<void>;
}
