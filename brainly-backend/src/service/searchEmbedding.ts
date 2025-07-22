
import { vectorStore } from "../index";


export async function searchEmbedding(query : string) {
  const vs = await vectorStore;
  const similaritySearchResult = await  vs.similaritySearch(query, 1);

  const result = similaritySearchResult.map((item) => {
    return item.pageContent;
  });
  return result;
}