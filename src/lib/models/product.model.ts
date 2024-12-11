import { DatabaseModel } from './database.model';

export class ProductDatabaseModel extends DatabaseModel {
    name: string = '';
}

export class ProductViewModel {
    id: number | null = 0;
    name: string = '';

    constructor() {

    }
}