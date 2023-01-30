/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { pbHealthResponse } from '../models/pbHealthResponse';
import type { rpcStatus } from '../models/rpcStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class HealthServiceService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns pbHealthResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public healthServiceHealth(): CancelablePromise<pbHealthResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/health',
        });
    }

}
