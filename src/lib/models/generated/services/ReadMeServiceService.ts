/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { pbCreateReadMeResponse } from '../models/pbCreateReadMeResponse';
import type { pbListReadMeResponse } from '../models/pbListReadMeResponse';
import type { pbReadReadMeResponse } from '../models/pbReadReadMeResponse';
import type { pbUpdateReadMeResponse } from '../models/pbUpdateReadMeResponse';
import type { rpcStatus } from '../models/rpcStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ReadMeServiceService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns pbListReadMeResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public readMeServiceListReadMe(): CancelablePromise<pbListReadMeResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/readme',
        });
    }

    /**
     * @param owner 
     * @param repo 
     * @param mainBranch 
     * @param fileExt 
     * @returns pbReadReadMeResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public readMeServiceReadReadMe(
owner: string,
repo: string,
mainBranch: string,
fileExt: string,
): CancelablePromise<pbReadReadMeResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/readme/{owner}/{repo}/{mainBranch}/{fileExt}',
            path: {
                'owner': owner,
                'repo': repo,
                'mainBranch': mainBranch,
                'fileExt': fileExt,
            },
        });
    }

    /**
     * @param owner 
     * @param repo 
     * @param mainBranch 
     * @param fileExt 
     * @param readMeHtmlHtml 
     * @returns pbCreateReadMeResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public readMeServiceCreateReadMe(
owner: string,
repo: string,
mainBranch: string,
fileExt: string,
readMeHtmlHtml?: string,
): CancelablePromise<pbCreateReadMeResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/readme/{owner}/{repo}/{mainBranch}/{fileExt}',
            path: {
                'owner': owner,
                'repo': repo,
                'mainBranch': mainBranch,
                'fileExt': fileExt,
            },
            query: {
                'readMeHtml.html': readMeHtmlHtml,
            },
        });
    }

    /**
     * @param owner 
     * @param repo 
     * @param mainBranch 
     * @param fileExt 
     * @param readMeHtmlHtml 
     * @returns pbUpdateReadMeResponse A successful response.
     * @returns rpcStatus An unexpected error response.
     * @throws ApiError
     */
    public readMeServiceUpdateReadMe(
owner: string,
repo: string,
mainBranch: string,
fileExt: string,
readMeHtmlHtml?: string,
): CancelablePromise<pbUpdateReadMeResponse | rpcStatus> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/readme/{owner}/{repo}/{mainBranch}/{fileExt}',
            path: {
                'owner': owner,
                'repo': repo,
                'mainBranch': mainBranch,
                'fileExt': fileExt,
            },
            query: {
                'readMeHtml.html': readMeHtmlHtml,
            },
        });
    }

}
