/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { pbRepoOwner } from './pbRepoOwner';

export type pbRepoContribution = {
    nameWithOwner?: string;
    name?: string;
    url?: string;
    owner?: pbRepoOwner;
};
