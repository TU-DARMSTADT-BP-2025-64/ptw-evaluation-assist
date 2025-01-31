import { WearThresholdFixStrategy, WearThresholdType } from '$lib/models/wear-threshold.model';
import { Logger } from '../logger';
import { Repository } from '../repository';
import { DatabaseClientMock } from './database-client.mock';
export function initTestEnvironment() {
	const dbClient = new DatabaseClientMock();
	Logger.Instance = new Logger();
	Repository.Instance = new Repository(dbClient);


	initTestProduct('1');
	initTestProduct('2');
}

function initTestProduct(id: string) {

	Repository.Instance.addProduct({
		id: id,
		name: 'Test Product',
		createdAt: Date.now(),
	});

	Repository.Instance.addAssemblyGroup({
		id: id,
		name: 'Test Assembly Group',
		productId: id,
		parentId: undefined
	})

	Repository.Instance.addAssemblyGroup({
		id: id + '1',
		name: 'Test Assembly Group 2',
		productId: id,
		parentId: id
	})

	Repository.Instance.addAssemblyComponent({
		id: id,
		assemblyGroupId: id,
		machineElement: 'Test Machine Element',
		machineElementCategory: 'Test Machine Element Category',
		name: 'Test Assembly Component',
		productId: id,
	});

	Repository.Instance.addWearCriterion({
		id: id,
		componentId: id,
		productId: id,
		label: 'Test Wear Criterion',
	});

	Repository.Instance.addWearThreshold({
		id: id,
		criterionId: id,
		productId: id,
		fixStrategy: WearThresholdFixStrategy.Reuse,
		label: 'Test Wear Threshold',
		measures: 'Test Measures',
		type: WearThresholdType.OpticalError,
		image: undefined
	});

	Repository.Instance.addThresholdStrategy({
		id: id,
		name: 'Reuse',
		priority: 1,
		productId: id
	});

	Repository.Instance.addThresholdStrategy({
		id: id + '1',
		name: 'Repair',
		priority: 2,
		productId: id
	});

	Repository.Instance.addThresholdStrategy({
		id: id + '2',
		name: 'Recycle',
		priority: 3,
		productId: id
	});
}
