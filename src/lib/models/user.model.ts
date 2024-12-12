import { DatabaseModel } from './database.model';

export class UserDatabaseModel extends DatabaseModel {
    public name: string = '';
    public password: string = '';
}