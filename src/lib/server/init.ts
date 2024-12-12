/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Logger } from './logger';
import { Repository } from './repository';

let initialized = false;
export function init() {
    if (initialized) {
        return;
    }

    console.log('Initializing application');
    initialized = true;
    Logger.Instance;
    Repository.Instance;
}
