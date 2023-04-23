<script lang="ts">
	import * as vis from "vis-network";
    import { DataSet } from "vis-data";

	import { env } from "$env/dynamic/public"
	import * as api from "$lib/api/rest/api";
	import { readMeContent, isInit, repoOwner, repoName, perPage, numContributions, showReadme, showHelp, showOptions, showNavigation } from "$lib/utility/store";
	import type { pbReadContributionsResponse, pbReadInfoResponse, pbReadContributorsResponse, pbReadReadMeResponse, pbRepoContributor } from "$lib/models/generated";
    import { styleNode } from "$lib/models/NodeStyle";
    import { styleEdge } from "$lib/models/EdgeStyle";
    import { DiscoverGraph } from "$lib/models/DiscoverGraph";
	import type { DiscoverNode, DiscoverEdge } from "$lib/models/DiscoverGraph";
	import DiscoverForceDirectedGraph from "$lib/components/DiscoverForceDirectedGraph.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import Readme from "$lib/components/Readme.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import OptionsModal from "$lib/components/OptionsModal.svelte";
	import HelpModal from "$lib/components/HelpModal.svelte";
	import NavModal from "$lib/components/NavModal.svelte";
	

	let g = new DiscoverGraph();
	let displayedNodes: DataSet<DiscoverNode> = new DataSet({});
    let displayedEdges: DataSet<DiscoverEdge> = new DataSet({});
	let anon: string = 'false';
	let page: number = 1;

    export let state: vis.Data = { nodes: displayedNodes, edges: displayedEdges };

	const write_footer = (env.PUBLIC_WRITE_FOOTER === 'true');
	const api_endpoint = env.PUBLIC_API_ENDPOINT || 'http://localhost:8080/api/v1'

	async function clearGraph(event: any) {
		displayedNodes.clear()
		displayedEdges.clear()
		g.clear()
		updateGraph()
		$isInit = true;
	}

	async function handleApiCall(event: any) {
		let calledOwner = event.detail.owner || $repoOwner;
		let calledRepo = event.detail.repo || $repoName;
		if (!$perPage) {
			$perPage = event.detail.perPage || 5
		}
		if (!$numContributions) {
			$numContributions = event.detail.numContributions || 5
		}

		// get the seed repo
		const info: pbReadInfoResponse = await api.getInfo(api_endpoint, calledOwner, calledRepo);
		g.pushOrigin(info, $isInit);

		const repo_id = info.message.nameWithOwner

		// update the displayed graph
		updateGraph()

		// get all contributors
		const contributors: pbReadContributorsResponse = await api.getContributors(api_endpoint, calledOwner, calledRepo, anon, $perPage, page);
		g.pushContributors(repo_id, contributors);

		// update the displayed graph
		updateGraph()

		let contributors_to_query: pbRepoContributor[] = contributors.message?.contributors || [];
		for (const contributor of contributors_to_query) {
			const contributor_login: string = contributor.login || "";
			if (contributor_login != "" && !(contributor_login.indexOf("[bot]") >= 0)) {
				const contributions: pbReadContributionsResponse = await api.getContributions(api_endpoint, contributor_login, $numContributions);
				g.pushContributions(contributor_login, contributions);

				// update the displayed graph
				updateGraph()
			}
		}

		// reset origin style
		g.pushOrigin(info, $isInit);

		// update the displayed graph
		updateGraph()

		// set to false once initialized
		$isInit = false;

	}

	async function updateGraph() {
		const arr = g.toNodeEdge();
        const newNodes = arr.nodes;
        const newEdges = arr.edges;

        newNodes.forEach((n: DiscoverNode) => styleNode(n));
        newEdges.forEach((n: DiscoverEdge) => styleEdge(n));

        displayedNodes.update(newNodes);
        displayedEdges.update(newEdges);
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

<Navbar on:init={handleApiCall}/>
<OptionsModal on:init={handleApiCall}/>

<div class="App">

	<DiscoverForceDirectedGraph {state} on:message={handleApiCall}/>

	{#if $showReadme}
		<Readme {readMeContent} />
	{/if}
	{#if $showHelp}
		<HelpModal />
	{/if}
	{#if $showOptions}
		<OptionsModal />
	{/if}
	{#if $showNavigation}
		<NavModal />
	{/if}

</div>

<div class="button-container">
	<button class="bg-slate-100 hover:bg-slate-200 text-gray-800 inline-flex px-4 border border-gray-400 rounded shadow" on:click={ () => { ($showReadme) ? showReadme.set(false) : showReadme.set(true); } }>Toggle README Pane</button><br/>
	<button class="bg-slate-100 hover:bg-slate-200 text-gray-800 inline-flex px-4 border border-gray-400 rounded shadow" on:click={clearGraph}>Clear Graph</button><br/>
</div>

{#if write_footer}
	<Footer />
{/if}
