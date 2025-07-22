import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

export async function generateTranscript(link:string){
  const loader = YoutubeLoader.createFromUrl(link, {
  language: "en",
  addVideoInfo: true,
  });

  const docs = await loader.load();

  const transcript:string = docs.map((doc) => doc.pageContent).join("\n"); 
  console.log(transcript)

  return transcript;
}


