/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Logger } from './logger';
import { Repository } from './repository';

console.log('Initializing application');

export function init() {
    Logger.Instance;
    Repository.Instance;
}