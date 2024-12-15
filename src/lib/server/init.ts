/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DatabaseClient } from './database-client';
import { Logger } from './logger';
import { Repository } from './repository';
import { ServerConstants } from './server-constants';

let initialized = false;
export function init() {
    if (initialized) {
        return;
    }

    console.log('Initializing application');

    initialized = true;
    const dbClient = new DatabaseClient(ServerConstants.DATABASE_NAME);
    Logger.Instance = new Logger();
    Repository.Instance = new Repository(dbClient);
}
