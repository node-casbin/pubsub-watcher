import { PubSub, ClientConfig } from '@google-cloud/pubsub';

export class PubsubConnection {
  private readonly options?: ClientConfig;
  public client: PubSub;

  public constructor(options?: ClientConfig) {
    this.options = options;
  }

  public open(): void {
    this.client = new PubSub(this.options);
  }

  public close(): Promise<void> {
    return this.client.close();
  }
}
