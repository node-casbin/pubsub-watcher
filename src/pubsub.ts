import { PubSub, ClientConfig, Subscription } from '@google-cloud/pubsub';

export class PubsubConnection {
  private readonly options?: ClientConfig;
  public client: PubSub;

  constructor(options?: ClientConfig) {
    this.options = options;
  }

  public open() {
    this.client = new PubSub(this.options);
  }

  public close() {
    this.client.close();
  }
}
