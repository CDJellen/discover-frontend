<script lang="ts">
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';

    import * as vis from "vis-network";
    import { DataSet } from "vis-data";

    import { env } from "$env/dynamic/public"
    import { readMeContent, showReadme } from "$lib/utility/store";
	import * as api from "$lib/api/rest/api";
    import type { DiscoverNode, DiscoverEdge } from "$lib/models/DiscoverGraph";
	import type { pbReadReadMeResponse } from "$lib/models/generated";

    //export let g = new DiscoverGraph();

    let target: HTMLDivElement;

    let searchKey: boolean = false;
  
    let network: vis.Network;
    let displayedNodes: DataSet<DiscoverNode> = new DataSet({});
    let displayedEdges: DataSet<DiscoverEdge> = new DataSet({});
    

    export let state: vis.Data = { nodes: displayedNodes, edges: displayedEdges };
  
    const dispatch = createEventDispatcher();
    const write_footer = (env.PUBLIC_WRITE_FOOTER === 'true');
    const height: number = write_footer ? 98 : 100;
	const api_endpoint = env.PUBLIC_API_ENDPOINT || 'http://localhost:8080/api/v1'

    onMount(() => {
        // TODO clean
        let doubleClickTime = new Date().getTime();
        const threshold: number = 200;

        async function handleReadMeCall(owner: string, repoName: string) {
            const readMeResponse: pbReadReadMeResponse = await api.getReadMe(api_endpoint, owner, repoName)
            let readMe: string = readMeResponse.message?.html || "<h1>Failed to Load: <a href=github.com>github.com</a></h1>"
            readMeContent.set(readMe);
            //readMeContent = mockApi.getReadMe(owner, repoName, null);
        }

        function onShiftClick(e: any) {
            if (searchKey) {
                doOnShiftClick(e);
            }
        }

        function doOnShiftClick(e: any) {
            if (e.nodes) {
                const nameWithOwner: string = String(network.getSelection().nodes[0])
                const owner = nameWithOwner.split("/")[0];
                const repoName = nameWithOwner.split("/")[1];

                if (owner != 'undefined' && repoName != 'undefined') {
                    dispatch('message', {
                        init: false,
                        owner: owner,
                        repo: repoName,
                    })
                }
            }
            network.unselectAll();
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
                const owner = nameWithOwner.split("/")[0] || 'undefined';
                const repoName = nameWithOwner.split("/")[1] || 'undefined';
                
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

        target.addEventListener('keydown', (e) => {
            if (e.key == 'Shift') {
                searchKey = true;
            }
        })

        target.addEventListener('keyup', (e) => {
            searchKey = false;
        })

        // core network events
        network.on('click', function(e) {onShiftClick(e)});
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
  
<div bind:this={target} style="width: 100%; height: {height}vh;" />
