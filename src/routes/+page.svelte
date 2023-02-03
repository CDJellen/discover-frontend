<script lang="ts">
	import { readMeContent, showReadme } from "$lib/components/store";

    import * as vis from "vis-network";
    import { DataSet } from "vis-data";

	import * as api from "$lib/api/rest/api";
	import type { pbReadContributionsResponse, pbReadInfoResponse, pbReadContributorsResponse, pbReadReadMeResponse, pbRepoContributor } from "$lib/models/generated";
    import { styleNode } from "$lib/models/NodeStyle";
    import { styleEdge } from "$lib/models/EdgeStyle";
    import { decompose, DiscoverGraph } from "$lib/models/DiscoverGraph";
	import type { DiscoverNode, DiscoverEdge } from "$lib/models/DiscoverGraph";
	import DiscoverForceDirectedGraph from "$lib/components/DiscoverForceDirectedGraph.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import Readme from "$lib/components/Readme.svelte";
	import Footer from "$lib/components/Footer.svelte";

	let g = new DiscoverGraph();
	let displayedNodes: DataSet<DiscoverNode> = new DataSet({});
    let displayedEdges: DataSet<DiscoverEdge> = new DataSet({});

    export let state: vis.Data = { nodes: displayedNodes, edges: displayedEdges };

	async function handleApiCall(event: any) {
		let calledOwner = event.detail.owner;
		let calledRepo = event.detail.repo;
		const repo_id = calledOwner+"/"+calledRepo;

		// get the seed repo
		const info: pbReadInfoResponse = await api.getInfo(calledOwner, calledRepo);
		g.pushOrigin(info);

		// update the disaplyed graph
		updateGraph()

		// get all contributors
		const contributors: pbReadContributorsResponse = await api.getContributors(calledOwner, calledRepo);
		g.pushContributors(repo_id, contributors);

		// update the disaplyed graph
		updateGraph()

		let contributors_to_query: pbRepoContributor[] = contributors.message?.contributors || [];
		for (const contributor of contributors_to_query) {
			const contributor_login: string = contributor.login || "";
			if (contributor_login != "" && !(contributor_login.indexOf("[bot]") >= 0)) {
				const contributions: pbReadContributionsResponse = await api.getContributions(contributor_login);
				g.pushContributions(contributor_login, contributions);

				// update the disaplyed graph
				updateGraph()
			}
		}
	}

	async function updateGraph() {
		const arr = g.toNodeEdge();
        const newNodes = arr.nodes;
        const newEdges = arr.edges;

        newNodes.forEach((n: DiscoverNode) => styleNode(n));
        newEdges.forEach((n: DiscoverEdge) => styleEdge(n));

        displayedNodes.add(newNodes);
        displayedEdges.add(newEdges);
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

	<DiscoverForceDirectedGraph {state}/>

	{#if $showReadme}
		<Readme {readMeContent} />
	{/if}

</div>

<div class="button-container">
	<button class="bg-slate-100 hover:bg-slate-200 text-gray-800 inline-flex px-4 border border-gray-400 rounded shadow" on:click={ () => { ($showReadme) ? showReadme.set(false) : showReadme.set(true); } }>Toggle README Pane</button><br/>
</div>

<Footer />
