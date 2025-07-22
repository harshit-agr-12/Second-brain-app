declare global {
  namespace  Express {
    export interface Request {
      userId? : string;
    }
  }
}


import express from "express";
import { UserModel, ContentModel, LinkModel } from "./db";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware";
import cors from "cors";
import {queryGemini} from "./service/geminiAI";
import {searchEmbedding} from './service/searchEmbedding'
import { storeEmbedding } from "./service/storeEmbeddings";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import {generateTranscript} from "./service/youtbeTranscript"

export const pinecone = new PineconeClient();
// Will automatically read the PINECONE_API_KEY and PINECONE_ENVIRONMENT env vars
export const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

const embeddings = new GoogleGenerativeAIEmbeddings({model:"text-embedding-004",apiKey: process.env.GEMENI_APIKEY,taskType: TaskType.RETRIEVAL_DOCUMENT,}) 

export  const vectorStore = PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    maxConcurrency: 5,
    // You can pass a namespace here too
    // namespace: "foo",
  });

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());



app.post("/api/v1/signup", async (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;
  try {
    await UserModel.create({ userName: userName, password: password });

    res.json({ message: "user is registerd!" });
  } catch (e) {
    res.status(411).json({
      message: "user already exixst",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const existingUser = await UserModel.findOne({
      userName: username,
      password,
    });

    console.log(existingUser);
    const jwtSecret = process.env.JWT_SECRET;

    if (existingUser) {
      const token = jwt.sign(
        {
          id: existingUser._id,
        },jwtSecret as string,
      );
      res.json({
        token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect Crendentials",
      });
    }
  } catch (e) {
    console.log("signin error", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  const userId = req.userId;
  const type = req.body.type;

  // const transcript = (type == "youtube") ?await generateTranscript(link) : "";
  const transcript= await generateTranscript(link);

  const content = await ContentModel.create({
    title,
    link,
    userId,
    type,
    tags: [],
    content: transcript,
  });

  storeEmbedding(link, transcript);

  res.json({
    message: "content added",
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = req.userId;

  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "userName");
  res.status(200).json({
    content : content,
  });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    contentId,
    userId: req.userId,
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const userid = req.userId;
  const share = req.body.share;
  const generateRandomString = function (){
    return Math.random().toString(20).substr(2, 10);
  };
  try{
    if(share){
      const hash = generateRandomString();
      const Link = await LinkModel.create({
        userId: userid,
        hash: hash,
      });
      res.json({
        link : "http://localhost:3000/api/v1/brain/"+Link.hash,
      })
    }
    else {
      await LinkModel.deleteOne({
        userId : userid
      })
    }
    res.json({
      message : "Updated shared Link"
    })
  }catch(e){
    console.log("internal server error", e);
    res.json({
      message : "error while generating share link"
    })
  }
  

});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  console.log(hash);
  
  try {
    const Link = await LinkModel.findOne({
      hash,
    });

    if(!Link){
      res.status(411).json({
        message : "Sorry Incorrect Input"
      })
    }else{
      const userid = Link.userId;

      const content = await ContentModel.find({
        userId: userid,
      }).populate("userId" , "userName");
      if (content) {
        res.json({
          content,
      });
      } else {
        res.json({
          message: "content cannot be fatched",
        });
      }
    }
  } catch (e) {
    console.log("shareLink is wrong", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/v1/brain/query" ,async (req,res)=>{
  //query from user
  const query = req.body.query;
  //i have perfectly convert my text to embedding
  const context=await searchEmbedding(query);
  console.log("context :", context);
  const prompt = `
You are a personal assistant that answers questions using the user's saved knowledge only.

Below is a list of content saved by the user (tweets, articles, notes, etc.):

---
${context}
---

Now answer the following question **based only on the above content**.

Question: ${query}

Be concise, helpful, and avoid making things up. If the answer can't be found, say "There is no saved content that matches this question. answer in less than 20 words."
`;
  const response =await queryGemini(prompt);
  res.json({
    "msg" : "works well",
    "result" : response
  })
})
 
app.listen(4000);