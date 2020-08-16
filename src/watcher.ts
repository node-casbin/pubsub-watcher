import { Watcher } from 'casbin';
import { ClientConfig, Subscription, Message } from '@google-cloud/pubsub';
import { PubsubConnection } from './pubsub';

export class PubsubWatcher implements Watcher {
  private topicName: string;
  private subscriptionName: string;
  private subscription: Subscription;
  private pubsubConnection: PubsubConnection;

  private callback: () => void;

  public static async newWatcher(options?: ClientConfig, topicName?: string, subscriptionName?: string): Promise<PubsubWatcher> {
    return new PubsubWatcher(options, topicName, subscriptionName);
  }

  private constructor(options?: ClientConfig, topicName?: string, subscriptionName?: string) {
    this.topicName = topicName || 'casbin';
    this.subscriptionName = subscriptionName || 'sub_casbin';

    this.pubsubConnection = new PubsubConnection(options);
    this.pubsubConnection.open();

    this.subscription = this.pubsubConnection.client.topic(this.topicName).subscription(this.subscriptionName);
    // Purge all messages, no need to replay as casbin cache will be updated at start up
    this.subscription.seek(new Date()).then(() => {
      this.subscription.on('message', this.messageHandler.bind(this));
    });
  }

  private messageHandler(message: Message): void {
    console.log(`Debug: ${this.subscriptionName} got message ID: ${message.id}`);
    message.ack();
    if (this.callback) this.callback();
  }

  public async update(): Promise<boolean> {
    await this.pubsubConnection.client.topic(this.topicName).publishMessage({ data: Buffer.from('casbin updated') });
    return true;
  }

  public setUpdateCallback(callback: () => void) {
    this.callback = callback;
  }

  public async close(): Promise<void> {
    this.subscription.removeListener('message', this.messageHandler.bind(this));
    await this.subscription.close();
    await this.pubsubConnection.close();
  }
}
