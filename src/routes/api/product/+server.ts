import { ProductViewModel } from '$lib/models/product.model';
import { Repository } from '$lib/server/repository';

export async function POST({request}: {request: Request}) {
    const product = (await request.json()) as ProductViewModel;
    console.log('AddProduct', product);
    const repository = Repository.Instance;
    const result = repository.addProduct(product);

    return new Response(JSON.stringify(result));
}

export async function GET() {
    const repository = Repository.Instance;
    const result = repository.getProducts();
    return new Response(JSON.stringify(result));
}