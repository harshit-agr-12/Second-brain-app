import { pineconeIndex , pinecone , vectorStore } from "../index";

import {Document } from "@langchain/core/documents"

export async function storeEmbedding(link: string,pageContent: string) {
    const document : Document = {
        pageContent: pageContent,
        metadata: { link : link}
    };
    const vs = await vectorStore;

    vs.addDocuments([document]);
}
