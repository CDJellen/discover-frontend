import type { pbReadInfoResponse, pbReadContributorsResponse, pbReadContributionsResponse, pbReadReadMeResponse } from "$lib/models/generated";
import type { DiscoverGraph } from "$lib/models/DiscoverGraph";
//import { env } from 'node:process';

//const base = env.API_ENDPOINT || 'http://localhost:8080/api/v1';
const base = '/api/v1';

export async function getInfo(owner: string, repoName: string): Promise<pbReadInfoResponse> {
    const res = await fetch(`${base}/info/${owner}/${repoName}`, { method: 'GET'});
    const repoInfo = await res.json();

    if (res.ok) {
        return repoInfo;
    } else {
        throw new Error(repoInfo);
    }
}

export async function getContributors(owner: string, repoName: string, anon: string | null, perPage: number | null, page: number | null): Promise<pbReadContributorsResponse> {
    if (!anon) {
        anon=''
    } else if (anon != '') {
        anon = 'true'
    }
    if (!perPage || perPage == 0) {
        perPage = 5
    }
    if (!page || page < 1) {
        page = 1
    }
    
    const res = await fetch(`${base}/contributors/${owner}/${repoName}?anon=${anon}?perPage=${perPage}?page=${page}`, { method: 'GET'});
    const repoContributors = await res.json();

    if (res.ok) {
        return repoContributors;
    } else {
        throw new Error(repoContributors);
    }
}

export async function getContributions(login: string, numContributions: number | null): Promise<pbReadContributionsResponse> {
    if (!numContributions || numContributions == 0) {
        numContributions = 5
    }
    const res = await fetch(`${base}/contributions/${login}?numContributions=${numContributions}`, { method: 'GET'});
    const userContributions = await res.json();

    if (res.ok) {
        return userContributions;
    } else {
        throw new Error(userContributions);
    }
}

export async function getReadMe(owner: string, repoName: string): Promise<pbReadReadMeResponse> {
    // assumed outdated README format  'master' branch rather than 'main'
    let res = await fetch(`${base}/readme/${owner}/${repoName}/main/md`);
    let readMe = await res.json();
    if (res.ok && !(readMe.message.html.indexOf("<h1>Failed") >= 0)) {
        return readMe;
    }
    res = await fetch(`${base}/readme/${owner}/${repoName}/master/md`);
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
