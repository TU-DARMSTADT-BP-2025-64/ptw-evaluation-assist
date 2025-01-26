import { DatabaseModel } from './database.model';

export class ThresholdStrategyDatabaseModel  extends DatabaseModel {
    public productId: string | undefined;
    public priority: number = 0;
    public name: string = '';
}



