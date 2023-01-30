<script lang="ts">
	import { readMeContent, showReadme } from "$lib/components/store";
	import * as mockApi from "$lib/api/mock/api";
	import * as api from "$lib/api/rest/api";
	import type { pbReadContributionsResponse, pbReadInfoResponse, pbReadContributorsResponse, pbReadReadMeResponse, pbRepoContributor } from "$lib/models/generated";
	import { DiscoverGraph } from "$lib/models/DiscoverGraph";
	import DiscoverForceDirectedGraph from "$lib/components/DiscoverForceDirectedGraph.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import Readme from "$lib/components/Readme.svelte";
	import Footer from "$lib/components/Footer.svelte";

	let g = new DiscoverGraph();
  
	//async function apiTest(owner: string, repo: string) {
	//	const msg: GitHubNetwork = await api.getDiscoverNetwork(owner, repo);
	//	onMessageReceived(msg);
	//}

	//<button class="bg-slate-100 hover:bg-slate-200 text-gray-800 inline-flex px-4 border border-gray-400 rounded shadow" on:click={ () => { mockApiResponse('mitre') } }>Mock API call (Caldera)</button><br/>
	//<button class="bg-slate-100 hover:bg-slate-200 text-gray-800 inline-flex px-4 border border-gray-400 rounded shadow" on:click={ () => { mockApiResponse('microsoft') } }>Mock API call (LightGBM)</button><br/>
	//<button class="bg-slate-100 hover:bg-slate-200 text-gray-800 inline-flex px-4 border border-gray-400 rounded shadow" on:click={ () => { mockApiResponse('pytorch') } }>Mock API call (PyTorch)</button><br/>


	async function handleApiCall(event: any) {
		let calledOwner = event.detail.owner;
		let calledRepo = event.detail.repo;
		const repo_id = calledOwner+"/"+calledRepo

		// get the seed repo
		const info: pbReadInfoResponse = await api.getInfo(calledOwner, calledRepo);
		g.pushOrigin(info)

		// get all contributors
		const contributors: pbReadContributorsResponse = await api.getContributors(calledOwner, calledRepo)
		g.pushContributors(repo_id, contributors)

		let contributors_to_query: pbRepoContributor[] = contributors.message?.contributors || []
		for (const contributor of contributors_to_query) {
			const contributor_login: string = contributor.login || ""
			if (contributor_login != "") {
				const contributions: pbReadContributionsResponse = await api.getContributions(contributor_login)
				g.pushContributions(contributor_login, contributions)
			}

		}

	}

</script>

<style>
	.App {
		background: rgb(0,0,0);
		background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(45,55,72,1) 100%);
		display: flex;
		height: 100%;
	}

	.button-container {
		position: absolute;
		bottom: 2rem;
		left: 0.5rem;
		z-index: 1;
	}
</style>

<div id="navbar"></div>
<Navbar on:message={handleApiCall}/>
<div class="App">

	<DiscoverForceDirectedGraph {g}/>

	{#if $showReadme}
		<Readme {readMeContent} />
	{/if}

</div>

<div class="button-container">
	<button class="bg-slate-100 hover:bg-slate-200 text-gray-800 inline-flex px-4 border border-gray-400 rounded shadow" on:click={ () => { ($showReadme) ? showReadme.set(false) : showReadme.set(true); } }>Toggle README Pane</button><br/>
</div>

<Footer />
