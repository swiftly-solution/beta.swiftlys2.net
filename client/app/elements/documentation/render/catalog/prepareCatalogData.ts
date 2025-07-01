import type { Documentation } from "~/types/docs/Documentation";
import type { ProcessedDocs } from "../navbar/prepareDocsData";

export interface ProcessedCatalog {
    key: string;
    url: string;
    icon: string;
    title: string;
    items: ProcessedDocs[];
}

export default function prepareCatalogData(docsData: Documentation[], category: string, interestKey: string) {
    const nodeMap: { [key: string]: ProcessedDocs } = {};

    docsData.forEach(doc => {
        const url = `/${category}/${doc.key.replace(/\./g, '/')}`;
        nodeMap[doc.key] = {
            key: doc.key,
            url,
            icon: doc.icon,
            title: doc.title,
            items: []
        };
    });

    const roots: ProcessedDocs[] = [];

    Object.values(nodeMap).forEach(node => {
        const parentKey = node.key.substring(0, node.key.lastIndexOf('.'));
        if (parentKey && nodeMap[parentKey]) {
            nodeMap[parentKey].items.push(node);
        } else {
            roots.push(node);
        }
    });

    return nodeMap[interestKey]
}