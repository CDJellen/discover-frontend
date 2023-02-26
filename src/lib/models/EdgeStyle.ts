import type { DiscoverEdge } from "$lib/models/DiscoverGraph";

export const baseEdgeOptions = () => ({
    // base edge attributes
    width: 2,
    color: {
        color: "#9d9da2",
        highlight: "#f5f5f5",
    },
    physics: true,
});

export function styleEdge(edge: DiscoverEdge) {
    // baseline edge attributes
    edge.dashes = false;
    edge.width = 2;
    edge.color = {
        color: "#9d9da2",
        highlight: "#f5f5f5",
    }
    edge.physics = true;

    // repo has user as major contributor
    //if (edge.isContributor) {
    //    edge.dashes = true;
    //    edge.width = 4;
    //}
    // user contributed to repo
    //else if (edge.isContribution) {
    //    edge.width = 2;
    //}
    return edge;
}
