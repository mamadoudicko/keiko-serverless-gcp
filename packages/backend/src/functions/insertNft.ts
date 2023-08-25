import { Bigtable, Table } from '@google-cloud/bigtable';
import { HttpFunction } from '@google-cloud/functions-framework';


import { generateRowKey, instanceId, tableId } from 'db/config';

// Initialize the Bigtable client
const bigtable = new Bigtable();

const createFamilyIfNotExists = async (table: Table, columnFamilyName: string): Promise<void> => {
  const [metadata] = await table.getMetadata();
  const columnFamilyExists = metadata.columnFamilies[columnFamilyName] !== undefined;
  if (!columnFamilyExists) {
    await table.createFamily(columnFamilyName);
  }

}

type CreateNftInput = {
  positionX: number;
  positionY: number;
  imageIndex: number;
}

export const insertNft: HttpFunction = async (request, response) => {
  try {
    console.log({
      req:  request
    })
    const requestData =  request.body  as CreateNftInput | undefined;
    
    if (requestData === undefined) {
      response.status(400).send('Bad Request: Request payload is missing.');
      
      return;
    }

    // Get a reference to the table
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const nftRowKey = generateRowKey();

    const columnFamilyName = 'nft';

    // Create a mutation to insert or update data
    const data = {
      key: nftRowKey,
      data: {
        [columnFamilyName]: {
          positionX: requestData.positionX,
          positionY: requestData.positionY,
          imageIndex: requestData.imageIndex,
        },
      },
    };

    await createFamilyIfNotExists(table, columnFamilyName);

    // Apply the mutation
    await table.insert(data);

    response.status(200).send('NFT data inserted/updated successfully.');
  } catch (error) {
    console.error('Error inserting/updating NFT data:', error);
    response.status(500).send(JSON.stringify(error));
  }
};


