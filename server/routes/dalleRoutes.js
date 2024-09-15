import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

 dotenv.config();

const router = express.Router();


router.route('/').get((req,res)=>{
    res.status(200).json({ message: 'Hello from limewire server' });
});

router.route('/').post(async (req,res)=>{
 try {
  const {prompt} = req.body; 
  console.log(prompt);
  const apiUrl = 'https://genai-api.picsart.io/v1/text2image';

const aiResponse = await fetch(apiUrl,
{
  method: 'POST',
  headers: {accept: 'application/json',
     'content-type': 'application/json',
    'X-Picsart-API-Key': process.env.PA_API_KEY,
    },
  body: JSON.stringify({
    prompt: prompt,
    negative_prompt: 'distorted faces',
    width: 1024,
    height: 1024,
    count: 1
  })
}
);

const data = await aiResponse.json();
const imageID = data["inference_id"]
console.log(data); 

const final = await fetch(`https://genai-api.picsart.io/v1/text2image/inferences/${imageID}`,
  {
    method: 'GET',
    headers: {accept: 'application/json',
      'X-Picsart-API-Key': process.env.PA_API_KEY,
      },    
  }
  );
  const finalGET = await final.json();

const image = finalGET.data[0].url;
console.log(image);
res.status(200).json({photo: image});

 } catch (error) {
    console.log(error)
    res.status(500).send(error.detail);
    
 }
}
);



export default router;
