import {Exception} from './Exception';

/**
 * Thrown when an entity with a given id is not found within a list of said entity.
 */
export class NoEntityFoundWithIdException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
