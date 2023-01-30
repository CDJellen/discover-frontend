/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { pbRepoContribution } from './pbRepoContribution';

export type pbContributions = {
    name?: string;
    url?: string;
    avatarUrl?: string;
    contributions?: Array<pbRepoContribution>;
};
