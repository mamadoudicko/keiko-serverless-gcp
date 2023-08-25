import { HttpFunction } from '@google-cloud/functions-framework';


import { CreateNftInput, insertNft } from 'functions/insertNft';


export const insertNfHandler: HttpFunction = async (request, response) => {
  try {

    const requestData =  request.body  as CreateNftInput | undefined;
    if (requestData === undefined) {
      
      response.status(400).send('Bad Request: Request payload is missing.');
      
      return;
    }

    await insertNft(requestData);

    response.status(200).send('NFT data inserted/updated successfully.');
  } catch (error) {

    console.error('Error inserting/updating NFT data:', error);
    response.status(500).send(JSON.stringify(error));

  }
};


