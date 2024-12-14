import { expect, test } from 'vitest';
import { DatabaseClientMock } from './database-client.mock';
import { Repository } from '../repository';
import { Logger } from '../logger';
import type { ProductViewModel } from '$lib/models/product.model';

test('repository', async () => {

    const dbClient = new DatabaseClientMock();

    Logger.Instance = new Logger();

    const repository = new Repository(dbClient);

    const products = repository.getProducts();

    expect(products).toEqual([]);

    repository.addProduct({ name: 'Test' } as ProductViewModel);

    const products2 = repository.getProducts();

    expect(products2.length).toEqual(1);
});