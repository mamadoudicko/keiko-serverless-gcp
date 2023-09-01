import express, { Express, Request, Response } from 'express';

import { getAllNft } from '../functions/getAllNft';
import { CreateNftInput, insertNft } from '../functions/insertNft';

const app: Express = express();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/getAllNft', async (_: Request, res: Response) => {
  console.log('getAllNft BABA');
  try {
    const nftDataArray = await getAllNft();
    res.send(nftDataArray);
  } catch (error) {
    res.status(500).send(JSON.stringify(error));
  }
});


app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/insertNft', async (req: Request, res: Response) => {
  try {
    const requestData = req.body as CreateNftInput | undefined;
       
    if (requestData === undefined) {
      res.status(400).send('Bad Request: Request payload is missing.');
      
      return;
    }

    const result = await insertNft(requestData);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});


export default app;