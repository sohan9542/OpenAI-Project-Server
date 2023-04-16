import express from "express";
import { Configuration, OpenAIApi } from 'openai';
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from 'body-parser'
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
  }
const app = express();
app.use(cors(corsOptions))

app.use(bodyParser.json())

app.post("/api/generate", async (req, res)=>{
  
    const category = req?.body?.category
   if(category){
    const response = await openai.createImage({
        ...req.body,
        n: 1,
        size: "512x512",
      });
      let image_url = response.data.data[0].url;

      res.send({image_url: image_url})
   }
   else{
    const response = await openai.createImage({
        prompt: req?.body?.prompt,
        n: 1,
        size: "512x512",
      });
      let image_url = response.data.data[0].url;

      res.send({image_url: image_url})
   }

})

app.listen(8000, ()=>{
    console.log("I am running")
})