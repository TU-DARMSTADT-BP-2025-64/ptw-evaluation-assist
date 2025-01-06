export class UserDatabaseModel {
    public id: number = 0;
    public name: string = '';
    public passwordHash: string = '';
}

// Interface für den Benutzer
export interface User {
    username: string;
    password: string;
}