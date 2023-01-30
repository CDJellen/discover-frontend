import type { pbReadContributionsResponse, pbReadContributorsResponse, pbReadInfoResponse } from "$lib/models/generated";
import type * as vis from "vis-network";
import type { DataSet } from "vis-data";

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
            this._nodes.set(node_id, node);
        } else {
            this._nodes.set(node_id, node);
        }
    }

    public addEdge(edge: DiscoverEdge) {
        //console.log("adding ", edge);
        this._edges.add(edge);
        //console.log("edges ", this._edges);
    }

    public pushOrigin(origin: pbReadInfoResponse) {
        this.processInfo(origin);
    }

    public pushContributors(repo_id: string, networkData: pbReadContributorsResponse) {
        this.processContributors(repo_id, networkData);
        return this;
    }
    
    public pushContributions(login: string, networkData: pbReadContributionsResponse) {
        this.processContributions(login, networkData);
        return this;
    }

    private processInfo(message: pbReadInfoResponse) {
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

        this._origin = origin
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
                this.addNode(contributor.login, contributor_node)
                
                let contributor_edge: DiscoverEdge = {
                    id: `${repo_id}>${contributor.login}`,
                    isContributor: true,
                    isContribution: false,
                    from: repo_id,
                    to: contributor.login
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
        for (const contribution of contributions) {
            let contribution_node: DiscoverNode = {...base_contributions_node}
            if (contribution.nameWithOwner != null) {
                contribution_node.avatar_url = contribution.owner?.avatarUrl
                contribution_node.id = contribution.nameWithOwner
                contribution_node.label = contribution.nameWithOwner
                contribution_node.url = contribution.url

                // add node to graph
                this.addNode(contribution.nameWithOwner, contribution_node)
                
                let contributor_edge: DiscoverEdge = {
                    id: `${login}>${contribution.nameWithOwner}`,
                    isContributor: false,
                    isContribution: true,
                    from: login,
                    to: contribution.nameWithOwner
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

    private ensureRepositoryNodeExists(origin: DiscoverNode) {
        if(!origin.id) {
            const baseOrigin: DiscoverNode = {
                id: "Repository Not Found.",
                label: "Repository Not Found.",
                isOrigin: true,
                isRepository: true,
                avatar_url: defaultAvatarUrl,
            };

            this._nodes.set("Repository Not Found.", baseOrigin);
        }
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
