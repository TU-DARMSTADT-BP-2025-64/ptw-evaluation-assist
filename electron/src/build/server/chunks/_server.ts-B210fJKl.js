import { R as Repository } from './repository-DsW9d6WW.js';
import './product.model-CtjXPvr8.js';
import 'uuid';
import 'bcrypt';
import 'better-sqlite3';
import './index-DK8hzxr2.js';
import 'node:path';
import 'node:os';
import 'node:process';
import 'dotenv';

function GET() {
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
async function PUT({ request }) {
  const { machineElementCategories, machineElements, machineElementCriteria } = await request.json();
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

export { GET, PUT };
//# sourceMappingURL=_server.ts-B210fJKl.js.map
