/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DatabaseClient } from './database-client';
import { Logger } from './logger';
import { Repository } from './repository';
import { ServerConstants } from './server-constants';
import { initTestEnvironment } from './tests/init-test';

console.log('test env', process.env.NODE_ENV);

let initialized = false;
export function init() {
	if (initialized) {
		return;
	}

	console.log('Initializing application');

	initialized = true;

	if (process.env.NODE_ENV === 'test') {
		initTestEnvironment();
		return;
	}

	const dbClient = new DatabaseClient(ServerConstants.DATABASE_NAME);
	Logger.Instance = new Logger();
	Repository.Instance = new Repository(dbClient);
}
