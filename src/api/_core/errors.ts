export class APIRequestError extends Error {
    constructor(message = 'API request failed') {
        super(message);

        this.name = 'APIRequestError';

        Object.setPrototypeOf(this, APIRequestError.prototype);
    }
}
