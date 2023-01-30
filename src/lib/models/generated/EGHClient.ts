/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { NodeHttpRequest } from './core/NodeHttpRequest';

import { ContributionsServiceService } from './services/ContributionsServiceService';
import { ContributorsServiceService } from './services/ContributorsServiceService';
import { HealthServiceService } from './services/HealthServiceService';
import { InfoServiceService } from './services/InfoServiceService';
import { ReadMeServiceService } from './services/ReadMeServiceService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class EGHClient {

    public readonly contributionsService: ContributionsServiceService;
    public readonly contributorsService: ContributorsServiceService;
    public readonly healthService: HealthServiceService;
    public readonly infoService: InfoServiceService;
    public readonly readMeService: ReadMeServiceService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = NodeHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? 'ersion not set',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.contributionsService = new ContributionsServiceService(this.request);
        this.contributorsService = new ContributorsServiceService(this.request);
        this.healthService = new HealthServiceService(this.request);
        this.infoService = new InfoServiceService(this.request);
        this.readMeService = new ReadMeServiceService(this.request);
    }
}
