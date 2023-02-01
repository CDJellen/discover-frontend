import type { pbReadInfoResponse, pbReadContributorsResponse, pbReadContributionsResponse, pbReadReadMeResponse } from "$lib/models/generated";
import type { DiscoverGraph } from "$lib/models/DiscoverGraph";
//import { env } from 'node:process';

//const base = env.API_ENDPOINT || 'http://localhost:8080/api/v1';
const base = 'http://127.0.0.1:8080/api/v1';

export async function getInfo(owner: string, repoName: string): Promise<pbReadInfoResponse> {
    const res = await fetch(`${base}/info/${owner}/${repoName}`, { method: 'GET'});
    const repoInfo = await res.json();

    if (res.ok) {
        return repoInfo;
    } else {
        throw new Error(repoInfo);
    }
}

export async function getContributors(owner: string, repoName: string): Promise<pbReadContributorsResponse> {
    const res = await fetch(`${base}/contributors/${owner}/${repoName}`, { method: 'GET'});
    const repoContributors = await res.json();

    if (res.ok) {
        return repoContributors;
    } else {
        throw new Error(repoContributors);
    }
}

export async function getContributions(login: string): Promise<pbReadContributionsResponse> {
    const res = await fetch(`${base}/contributions/${login}`, { method: 'GET'});
    const userContributions = await res.json();

    if (res.ok) {
        return userContributions;
    } else {
        throw new Error(userContributions);
    }
}

export async function getReadMe(owner: string, repoName: string): Promise<pbReadReadMeResponse> {
    // assumed outdated README format  'master' branch rather than 'main'
    let res = await fetch(`${base}/readme/${owner}/${repoName}/master/md`);
    let readMe = await res.json();
    if (res.ok && !(readMe.message.html.indexOf("<h1>Failed to Load:") >= 0)) {
        return readMe;
    }
    res = await fetch(`${base}/readme/${owner}/${repoName}/main/md`);
    readMe = await res.json();
    if (res.ok) {
        return readMe;
    } else {
        throw new Error(readMe);
    }

}

//export async function clearDiscoverNetwork(): Promise<DiscoverGraph> {
//    const message: DiscoverGraph{}
//    return message
//}
