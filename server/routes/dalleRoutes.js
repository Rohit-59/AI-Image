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
    const apiUrl = 'https://api.limewire.com/api/image/generation';

const aiResponse = await fetch(apiUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Version': 'v1',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.LM_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: '1:1'
      })
    }
  );

  const data = await aiResponse.json();
  console.log(data); 


const image = data.data[0].asset_url;

res.status(200).json({photo: image});

 } catch (error) {
    console.log(error)
    res.status(500).send(error.detail);
    
 }
}
);



export default router;
