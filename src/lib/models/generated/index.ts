/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { EGHClient } from './EGHClient';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { pbContributions } from './models/pbContributions';
export type { pbCreateContributionsResponse } from './models/pbCreateContributionsResponse';
export type { pbCreateContributorsResponse } from './models/pbCreateContributorsResponse';
export type { pbCreateInfoResponse } from './models/pbCreateInfoResponse';
export type { pbCreateReadMeResponse } from './models/pbCreateReadMeResponse';
export type { pbHealthResponse } from './models/pbHealthResponse';
export type { pbListContributionsResponse } from './models/pbListContributionsResponse';
export type { pbListContributorsResponse } from './models/pbListContributorsResponse';
export type { pbListInfoResponse } from './models/pbListInfoResponse';
export type { pbListReadMeResponse } from './models/pbListReadMeResponse';
export type { pbReadContributionsResponse } from './models/pbReadContributionsResponse';
export type { pbReadContributorsResponse } from './models/pbReadContributorsResponse';
export type { pbReadInfoResponse } from './models/pbReadInfoResponse';
export type { pbReadMeHtml } from './models/pbReadMeHtml';
export type { pbReadReadMeResponse } from './models/pbReadReadMeResponse';
export type { pbRepoContribution } from './models/pbRepoContribution';
export type { pbRepoContributor } from './models/pbRepoContributor';
export type { pbRepoContributors } from './models/pbRepoContributors';
export type { pbRepoOwner } from './models/pbRepoOwner';
export type { pbUpdateContributionsResponse } from './models/pbUpdateContributionsResponse';
export type { pbUpdateContributorsResponse } from './models/pbUpdateContributorsResponse';
export type { pbUpdateInfoResponse } from './models/pbUpdateInfoResponse';
export type { pbUpdateReadMeResponse } from './models/pbUpdateReadMeResponse';
export type { protobufAny } from './models/protobufAny';
export type { rpcStatus } from './models/rpcStatus';

export { ContributionsServiceService } from './services/ContributionsServiceService';
export { ContributorsServiceService } from './services/ContributorsServiceService';
export { HealthServiceService } from './services/HealthServiceService';
export { InfoServiceService } from './services/InfoServiceService';
export { ReadMeServiceService } from './services/ReadMeServiceService';
