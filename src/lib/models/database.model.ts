import { v4 as uuidv4 } from 'uuid';

export abstract class DatabaseModel {
    public id: string = uuidv4();
}