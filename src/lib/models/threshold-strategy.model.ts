import { DatabaseModel } from './database.model';
import type { ProductTreeViewModel } from './product.model';
import {v4 as uuidv4} from 'uuid';

export class ThresholdStrategyDatabaseModel  extends DatabaseModel {
    public productId: string | undefined;
    public priority: number = 0;
    public name: string = '';
}

export class ThresholdStrategyViewModel {
    public id: string = uuidv4();
    public productId: string | undefined;
    public priority: number = 0;
    public name: string = '';

    constructor(options: Partial<ThresholdStrategyViewModel> = {}) {
        Object.assign(this, options);
    }
}

export class ThresholdStrategyTreeViewModel {
    public id: string = uuidv4();

    public product: ProductTreeViewModel | undefined;
    public priority: number = 0;
    public name: string = '';
    
    constructor(options: Partial<ThresholdStrategyTreeViewModel> = {}) {
        Object.assign(this, options);
    }
}




