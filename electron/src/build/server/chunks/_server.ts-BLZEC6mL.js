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

async function POST({ request }) {
  const product = await request.json();
  console.log("AddProduct", product);
  const repository = Repository.Instance;
  const result = repository.addProduct(product);
  return new Response(JSON.stringify(result));
}
async function GET() {
  const repository = Repository.Instance;
  console.log("GetProducts");
  const result = repository.getProducts().sort((a, b) => a.createdAt - b.createdAt);
  return new Response(JSON.stringify(result));
}

export { GET, POST };
//# sourceMappingURL=_server.ts-BLZEC6mL.js.map
