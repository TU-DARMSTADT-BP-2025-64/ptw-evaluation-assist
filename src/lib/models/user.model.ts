import { DatabaseModel } from './database.model';

export class UserDatabaseModel extends DatabaseModel {
    public name: string = '';
    public passwordHash: string = '';
}

// Interface für den Benutzer
export interface User {
    username: string;
    password: string;
}