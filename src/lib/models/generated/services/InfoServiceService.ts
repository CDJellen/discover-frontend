/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { pbCreateInfoResponse } from '../models/pbCreateInfoResponse';
import type { pbListInfoResponse } from '../models/pbListInfoResponse';
import type { pbReadInfoResponse } from '../models/pbReadInfoResponse';
import type { pbUpdateInfoResponse } from '../models/pbUpdateInfoResponse';
import type { rpcStatus } from '../models/rpcStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InfoServiceService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns pbListInfoResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public infoServiceListInfo(): CancelablePromise<pbListInfoResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/info',
        });
    }

    /**
     * @param owner 
     * @param repo 
     * @returns pbReadInfoResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public infoServiceReadInfo(
owner: string,
repo: string,
): CancelablePromise<pbReadInfoResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/info/{owner}/{repo}',
            path: {
                'owner': owner,
                'repo': repo,
            },
        });
    }

    /**
     * @param owner 
     * @param repo 
     * @param infoNameWithOwner 
     * @param infoName 
     * @param infoUrl 
     * @param infoOwnerLogin 
     * @param infoOwnerUrl 
     * @param infoOwnerAvatarUrl 
     * @returns pbCreateInfoResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public infoServiceCreateInfo(
owner: string,
repo: string,
infoNameWithOwner?: string,
infoName?: string,
infoUrl?: string,
infoOwnerLogin?: string,
infoOwnerUrl?: string,
infoOwnerAvatarUrl?: string,
): CancelablePromise<pbCreateInfoResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/info/{owner}/{repo}',
            path: {
                'owner': owner,
                'repo': repo,
            },
            query: {
                'info.nameWithOwner': infoNameWithOwner,
                'info.name': infoName,
                'info.url': infoUrl,
                'info.owner.login': infoOwnerLogin,
                'info.owner.url': infoOwnerUrl,
                'info.owner.avatarUrl': infoOwnerAvatarUrl,
            },
        });
    }

    /**
     * @param owner 
     * @param repo 
     * @param infoNameWithOwner 
     * @param infoName 
     * @param infoUrl 
     * @param infoOwnerLogin 
     * @param infoOwnerUrl 
     * @param infoOwnerAvatarUrl 
     * @returns pbUpdateInfoResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public infoServiceUpdateInfo(
owner: string,
repo: string,
infoNameWithOwner?: string,
infoName?: string,
infoUrl?: string,
infoOwnerLogin?: string,
infoOwnerUrl?: string,
infoOwnerAvatarUrl?: string,
): CancelablePromise<pbUpdateInfoResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/info/{owner}/{repo}',
            path: {
                'owner': owner,
                'repo': repo,
            },
            query: {
                'info.nameWithOwner': infoNameWithOwner,
                'info.name': infoName,
                'info.url': infoUrl,
                'info.owner.login': infoOwnerLogin,
                'info.owner.url': infoOwnerUrl,
                'info.owner.avatarUrl': infoOwnerAvatarUrl,
            },
        });
    }

}
