import type { pbReadContributionsResponse, pbReadContributorsResponse, pbReadInfoResponse } from "$lib/models/generated";
import type * as vis from "vis-network";

const defaultAvatarUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
const defaultUrl = "https://github.com"

export class DiscoverGraph {
    private _origin?: DiscoverNode | null;
    private _nodes: Map<string, DiscoverNode>;
    private _edges: Set<DiscoverEdge>;

    public get nodes(): Map<string, DiscoverNode> {
        return this._nodes;
    }

    constructor(origin = null) {
        this._origin = origin;    
        this._nodes = new Map<string, DiscoverNode>();
        this._edges = new Set<DiscoverEdge>();
    }

    public addNode(node_id: string, node: DiscoverNode) {
        if (node_id in this._nodes) {
            // TODO: merge nodes?
            //this._nodes.set(node_id, node);
        } else {
            this._nodes.set(node_id, node);
        }
    }

    public checkEdge(edge: DiscoverEdge) {
        return edge.id in this._edges;
    }
    
    public checkNode(node_id: string) {
        return this._nodes.has(node_id);
    }

    public addEdge(edge: DiscoverEdge) {
        this._edges.add(edge);
    }

    public pushOrigin(origin: pbReadInfoResponse, init: boolean) {
        this.processInfo(origin, init);
    }

    public pushContributors(repo_id: string, networkData: pbReadContributorsResponse) {
        this.processContributors(repo_id, networkData);
        return this;
    }
    
    public pushContributions(login: string, networkData: pbReadContributionsResponse) {
        this.processContributions(login, networkData);
        return this;
    }

    private processInfo(message: pbReadInfoResponse, init: boolean) {
        let origin_id = message.message?.nameWithOwner
        let origin: DiscoverNode = {
            isOrigin: true,
            isRepository: true,
            avatar_url: defaultAvatarUrl,
            url: defaultUrl,
            id: "Repository Not Found.",
            label: "Repository Not Found.",
        }
        if (origin_id != null) {
            origin.id = origin_id
            origin.label = origin_id
            origin.avatar_url = message.message?.owner?.avatarUrl
        }
        if (init) {
            this._origin = origin
        }
        
        // add new seed node even if we've already seen in
        this.addNode(origin_id, origin)
        
    }

    private processContributors(repo_id: string, message: pbReadContributorsResponse) {
        let contributors = message.message?.contributors || []
        const base_contributor_node: DiscoverNode = {
            isOrigin: false,
            isRepository: false,
            avatar_url: defaultAvatarUrl,
        }
        for (const contributor of contributors) {
            let contributor_node: DiscoverNode = {...base_contributor_node}
            if (contributor.login != null) {
                contributor_node.avatar_url = contributor.avatarUrl
                contributor_node.num_contributions = contributor.contributions
                contributor_node.id = contributor.login
                contributor_node.label = contributor.login
                contributor_node.url = contributor.htmlUrl

                // add node to graph
                if (!this.checkNode(contributor.login)) {
                    this.addNode(contributor.login, contributor_node)
                }

                let contributor_edge: DiscoverEdge = {
                    id: `${contributor.login}>${repo_id}`,
                    isContributor: false,
                    isContribution: true,
                    from: contributor.login,
                    to: repo_id,
                    num_contributions: contributor.contributions
                }

                // add edge to graph
                this.addEdge(contributor_edge)
            }
        }
    }

    private processContributions(login: string, message: pbReadContributionsResponse) {
        let contributions = message.message?.contributions || []
        const base_contributions_node: DiscoverNode = {
            isOrigin: false,
            isRepository: true,
            avatar_url: defaultAvatarUrl,
        }

        // iterate through contributions
        for (const contribution of contributions) {
            let contribution_node: DiscoverNode = {...base_contributions_node}
            if (contribution.nameWithOwner != null) {
                contribution_node.avatar_url = contribution.owner?.avatarUrl
                contribution_node.id = contribution.nameWithOwner
                contribution_node.label = contribution.nameWithOwner
                contribution_node.url = contribution.url

                // add node to graph
                if (this.checkNode(contribution.nameWithOwner) === false) {
                    this.addNode(contribution.nameWithOwner, contribution_node)
                } else {
                }

                let contributor_edge: DiscoverEdge = {
                    id: `${login}>${contribution.nameWithOwner}`,
                    isContributor: false,
                    isContribution: true,
                    from: login,
                    to: contribution.nameWithOwner,
                }

                // add edge to graph
                this.addEdge(contributor_edge)
            }
        }
    }

    public toNodeEdge(): NodeEdgeArray {
        return { 
            nodes: [...this._nodes.values()],
            edges: [...this._edges.values()]
        };
    }

    public clear() {
        this._nodes.clear();
        this._edges.clear();
        this._origin = null;
    }
}

export interface DiscoverNode extends vis.Node {
  isOrigin?: boolean;
  isRepository?: boolean;
  avatar_url?: string;
  num_contributions?: number;
  url?: string;
}

export interface DiscoverEdge extends vis.Edge {
  isContributor?: boolean;
  isContribution?: boolean;
  num_contributions?: number;
}

export interface NodeEdgeArray {
  nodes: DiscoverNode[];
  edges: DiscoverEdge[];
}

export function decompose(arr: NodeEdgeArray) {
    const { nodes: nodeMap, edges } = arr;
    const newNodes = [...nodeMap.values()];

    const newEdges = [];
    for (const node of newNodes) {
      const isEdge = edges.filter( (e) => (e.from === node.id || e.to === node.id) );
        newEdges.push(...isEdge);
    }

    const newEdgesCleaned = [...new Set(newEdges)];

    return { newNodes: newNodes, newEdges: newEdgesCleaned };
}
