import { Request, Response } from 'express';

import { getAllNft } from 'functions/getAllNft';




export const getAllNftHandler = async (_: Request, res: Response): Promise<void> => {
  try {

    const nftDataArray = await getAllNft()
    res.send(nftDataArray); 

  } catch (error) {
    console.error('Error fetching data from Bigtable:', error);
    res.status(500).send('Internal Server Error');
  }
};
