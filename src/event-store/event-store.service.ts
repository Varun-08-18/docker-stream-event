
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EventStoreDBClient,
  jsonEvent,
} from '@eventstore/db-client';

@Injectable()
export class EventStoreService implements OnModuleDestroy {
  private readonly client: EventStoreDBClient;

  constructor(private readonly configService: ConfigService) {
    const endpoint =
      this.configService.getOrThrow<string>(
        'EVENTSTOREDB_ENDPOINT',
      );

    this.client = EventStoreDBClient.connectionString(endpoint);
  }

  async storeEvent(eventType: string, payload: any) {
    const event = jsonEvent({
      type: eventType,
      data: payload,
    });

    const streamName = 'task-stream';

    await this.client.appendToStream(streamName, event);

    return {
      eventType,
      payload,
      streamName,
    };
  }

  async onModuleDestroy() {
    await this.client.dispose();
  }
}
