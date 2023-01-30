/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { pbCreateContributorsResponse } from '../models/pbCreateContributorsResponse';
import type { pbListContributorsResponse } from '../models/pbListContributorsResponse';
import type { pbReadContributorsResponse } from '../models/pbReadContributorsResponse';
import type { pbUpdateContributorsResponse } from '../models/pbUpdateContributorsResponse';
import type { rpcStatus } from '../models/rpcStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ContributorsServiceService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns pbListContributorsResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public contributorsServiceListContributors(): CancelablePromise<pbListContributorsResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/contributors',
        });
    }

    /**
     * @param owner 
     * @param repo 
     * @param anon 
     * @param perPage 
     * @param page 
     * @returns pbReadContributorsResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public contributorsServiceReadContributors(
owner: string,
repo: string,
anon?: string,
perPage?: number,
page?: number,
): CancelablePromise<pbReadContributorsResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/contributors/{owner}/{repo}',
            path: {
                'owner': owner,
                'repo': repo,
            },
            query: {
                'anon': anon,
                'perPage': perPage,
                'page': page,
            },
        });
    }

    /**
     * @param owner 
     * @param repo 
     * @returns pbCreateContributorsResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public contributorsServiceCreateContributors(
owner: string,
repo: string,
): CancelablePromise<pbCreateContributorsResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/contributors/{owner}/{repo}',
            path: {
                'owner': owner,
                'repo': repo,
            },
        });
    }

    /**
     * @param owner 
     * @param repo 
     * @returns pbUpdateContributorsResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public contributorsServiceUpdateContributors(
owner: string,
repo: string,
): CancelablePromise<pbUpdateContributorsResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/contributors/{owner}/{repo}',
            path: {
                'owner': owner,
                'repo': repo,
            },
        });
    }

}
