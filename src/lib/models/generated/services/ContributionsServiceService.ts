/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { pbCreateContributionsResponse } from '../models/pbCreateContributionsResponse';
import type { pbListContributionsResponse } from '../models/pbListContributionsResponse';
import type { pbReadContributionsResponse } from '../models/pbReadContributionsResponse';
import type { pbUpdateContributionsResponse } from '../models/pbUpdateContributionsResponse';
import type { rpcStatus } from '../models/rpcStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ContributionsServiceService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns pbListContributionsResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public contributionsServiceListContributions(): CancelablePromise<pbListContributionsResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/contributions',
        });
    }

    /**
     * @param login 
     * @param numContributions 
     * @returns pbReadContributionsResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public contributionsServiceReadContributions(
login: string,
numContributions?: number,
): CancelablePromise<pbReadContributionsResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/contributions/{login}',
            path: {
                'login': login,
            },
            query: {
                'numContributions': numContributions,
            },
        });
    }

    /**
     * @param login 
     * @param contributionsName 
     * @param contributionsUrl 
     * @param contributionsAvatarUrl 
     * @returns pbCreateContributionsResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public contributionsServiceCreateContributions(
login: string,
contributionsName?: string,
contributionsUrl?: string,
contributionsAvatarUrl?: string,
): CancelablePromise<pbCreateContributionsResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/contributions/{login}',
            path: {
                'login': login,
            },
            query: {
                'contributions.name': contributionsName,
                'contributions.url': contributionsUrl,
                'contributions.avatarUrl': contributionsAvatarUrl,
            },
        });
    }

    /**
     * @param login 
     * @param contributionsName 
     * @param contributionsUrl 
     * @param contributionsAvatarUrl 
     * @returns pbUpdateContributionsResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public contributionsServiceUpdateContributions(
login: string,
contributionsName?: string,
contributionsUrl?: string,
contributionsAvatarUrl?: string,
): CancelablePromise<pbUpdateContributionsResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/contributions/{login}',
            path: {
                'login': login,
            },
            query: {
                'contributions.name': contributionsName,
                'contributions.url': contributionsUrl,
                'contributions.avatarUrl': contributionsAvatarUrl,
            },
        });
    }

}
