import { Logger } from '../logger';
import { Repository } from '../repository';
import { DatabaseClientMock } from './database-client.mock';
export function initTestEnvironment() {
	const dbClient = new DatabaseClientMock();
	Logger.Instance = new Logger();
	Repository.Instance = new Repository(dbClient);

	Repository.Instance.addProduct({
		id: '1',
		name: 'Test Product'
	});

	Repository.Instance.addProduct({
		id: '2',
		name: 'Test Product 2'
	});
}
