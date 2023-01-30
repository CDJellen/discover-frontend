import type { DiscoverNode } from "$lib/models/DiscoverGraph";

export function styleNode(node: DiscoverNode) {
    node.size = 48;
    node.borderWidth = 3;
    node.borderWidthSelected = 5,
    node.color = {
        border: "#f9fbfd",
        background: "#f9fbfd",
        highlight: {
            border: '#0f4d92',
            background: "#0f4d92",
        },
        hover: {
            border: "#0f4d92"
        }
    }
    node.font = {
        color: "#f9fbfd",
        face: 'verdana',
        strokeWidth: 0.2,
        strokeColor: "#2d3748",
        size: 24,
    }
    node.physics = true;
    node.shadow = {
        enabled: true,
        color: "rgba(255,255,255,0.4)",
        size: 10,
        x: 0,
        y: 0
    }
    node.shape = "circularImage";
    node.image = node.avatar_url;

    if (node.isRepository) {
        node.size = 32;
        node.mass = 5;
    }

    if (node.isOrigin) {
        node.size = 96;
        node.font = {
            color: "#f9fbfd",
            face: 'verdana',
            strokeWidth: 0.4,
            strokeColor: "#f9fbfd",
            size: 32,
        }
    }
  
    return node;
}
