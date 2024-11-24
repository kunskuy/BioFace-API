export const HTTP_RESPONSE = {
    OK: { code: 200, status: 'success', message: 'OK' },
    CREATED: { code: 201, status: 'success', message: 'Created' },
    BAD_REQUEST: { code: 400, status: 'fail', message: 'Bad Request' },
    UNAUTHORIZED: { code: 401, status: 'fail', message: 'Unauthorized' },
    FORBIDDEN: { code: 403, status: 'fail', message: 'Forbidden' },
    NOT_FOUND: { code: 404, status: 'fail', message: 'Not Found' },
    PAYLOAD_TOO_LARGE: { code: 413, status: 'fail', message: 'Payload Too Large' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'error', message: 'Internal Server Error' }
};

export class ApiError extends Error {
    code: number;
    status: string;

    constructor(httpResponse: typeof HTTP_RESPONSE[keyof typeof HTTP_RESPONSE]) {
        super(httpResponse.message);
        this.name = 'ApiError';
        this.code = httpResponse.code;
        this.status = httpResponse.status;
    }
}