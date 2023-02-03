<script lang="ts">
    import { onMount } from "svelte";
    import * as vis from "vis-network";
    import { DataSet } from "vis-data";

    import { readMeContent, showReadme } from "$lib/components/store";
	import * as api from "$lib/api/rest/api";
    import { styleNode } from "$lib/models/NodeStyle";
    import { styleEdge } from "$lib/models/EdgeStyle";
    import { decompose, DiscoverGraph } from "$lib/models/DiscoverGraph";
    import type { DiscoverNode, DiscoverEdge } from "$lib/models/DiscoverGraph";
	import type { pbReadReadMeResponse } from "$lib/models/generated";

    //export let g = new DiscoverGraph();

    let target: HTMLDivElement;
  
    let network: vis.Network;
    let displayedNodes: DataSet<DiscoverNode> = new DataSet({});
    let displayedEdges: DataSet<DiscoverEdge> = new DataSet({});

    export let state: vis.Data = { nodes: displayedNodes, edges: displayedEdges };
  
    onMount(() => {
        // TODO clean
        let doubleClickTime = new Date().getTime();
        const threshold: number = 200;

        async function handleReadMeCall(owner: string, repoName: string) {
            const readMeResponse: pbReadReadMeResponse = await api.getReadMe(owner, repoName)
            let readMe: string = readMeResponse.message?.html || "<h1>Failed to Load: <a href=github.com>github.com</a></h1>"
            readMeContent.set(readMe);
            //readMeContent = mockApi.getReadMe(owner, repoName, null);
        }

        function onDoubleClick(e: any) {
            doubleClickTime = new Date().getTime();
            doOnDoubleClick(e);
        }

        function doOnDoubleClick(e: any) {
            doubleClickTime = new Date().getTime();
            if (e.nodes) {
                showReadme.set(true);

                const nameWithOwner: string = String(network.getSelection().nodes[0])
                const owner = nameWithOwner.split("/")[0] || 'foo';
                const repoName = nameWithOwner.split("/")[1] || 'bar';
                
                handleReadMeCall(owner, repoName);
            }
            network.unselectAll();
        }

        let options: vis.Options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            layout: {
                randomSeed: 2020,
            },
            interaction: {
                keyboard: {
                    enabled: true,
                },
            },
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -22,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.35,
                },
                maxVelocity: 100,
                solver: "forceAtlas2Based",
                timestep: 0.35,
                stabilization: {
                    enabled: true,
                    iterations: 500,
                    updateInterval: 25,
                },
            },
        };
  
        // init network
        network = new vis.Network(target, state, options);

        // core network events
        network.on('doubleClick', function(e) {onDoubleClick(e)});
        // other network events
        //network.on('hoverNode', function (e) {doOnHoverNode(e)});
        //network.on('blurNode', function (e) {doOnBlurNode(e)});

    });
  
    $: {
        state && updateNodes();
    }
    
    const updateNodes = () => {
        network?.fit({
            animation: false,
        });
    };

</script>
  
<div bind:this={target} style="width: 100%; height: 97.5vh;" />
