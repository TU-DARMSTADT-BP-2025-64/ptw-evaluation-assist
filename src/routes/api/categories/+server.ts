import type { MachineElementCategoryViewModel } from '$lib/models/machine-element-category.model';
import type {MachineElementViewModel} from '$lib/models/machine-element.model';
import type {MachineElementCriteriaViewModel} from '$lib/models/machine-element-criteria.model';
import { Repository } from '$lib/server/repository';

export function GET() {
	const repository = Repository.Instance;
	const machineElementCategories = repository.getMachineElementCategories();
	const machineElements = repository.getMachineElements();
	const machineElementCriteria = repository.getMachineElementCriteria();

	return new Response(
		JSON.stringify({
			machineElementCategories,
			machineElements,
			machineElementCriteria
		})
	);
}

export async function PUT({ request }: { request: Request }) {
	const { machineElementCategories, machineElements, machineElementCriteria } =
		(await request.json()) as {
			machineElementCategories: MachineElementCategoryViewModel[];
			machineElements: MachineElementViewModel[];
			machineElementCriteria: MachineElementCriteriaViewModel[];
		};

	const repository = Repository.Instance;

    repository.deleteMachineElementCriteria();
    repository.deleteMachineElements();
    repository.deleteMachineElementCategories();
    
    

	machineElementCategories.forEach((category) => {
		repository.addMachineElementCategory(category);
	});

	machineElements.forEach((element) => {
		repository.addMachineElement(element);
	});

	machineElementCriteria.forEach((criterion) => {
		repository.addMachineElementCriteria(criterion);
	});

	return new Response(null, { status: 201 });
}
