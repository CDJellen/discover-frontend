import * as exampleApiResponseCaldera from "$lib/assets/example_github_network_caldera.json";
import * as exampleApiResponseLightGbm from "$lib/assets/example_github_network_lightgbm.json";
import * as exampleApiResponsePyTorch from "$lib/assets/example_github_network_pytorch.json";
import * as exampleApiResponseHTML from "$lib/assets/frida_cors_response.txt";

import type { GitHubNetwork } from "$lib/models/GitHub";

export function getDiscoverNetwork(owner: string, repoName: string, headers: HeadersInit | null): GitHubNetwork {
    
    let message: GitHubNetwork;
    
    switch (owner) {
        case 'microsoft':
            message = exampleApiResponseLightGbm;
            return message;
        case 'mitre':
            message = exampleApiResponseCaldera;
            return message;
        case 'pytorch':
            message = exampleApiResponsePyTorch;
            return message;
        default:
            message = exampleApiResponseLightGbm;
    }

    return message;
}

export function getReadMe(owner: string, repoName: string, headers: HeadersInit | null): string {
    const message: string = exampleApiResponseHTML;

    return message;
}