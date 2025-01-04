import { Repository } from '$lib/server/repository';

export async function DELETE({params}: {params: {id: string}}) {
    console.log('DeleteProduct', params);
    const repository = Repository.Instance;
    const result = repository.deleteProduct(params.id);
    return new Response(JSON.stringify(result));
}