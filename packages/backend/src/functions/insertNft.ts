import { Bigtable } from '@google-cloud/bigtable';

import { instanceId, nftRowKey, tableId } from 'db/config';

// Initialize the Bigtable client
const bigtable = new Bigtable();

export const insertNft = async (): Promise<void> => {
  try {
    // Get a reference to the table
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // Create a mutation to insert or update data
    const data = {
      key: nftRowKey,
      data: {
        positionX: 0,
        positionY: 1,
        imageIndex: 0,
      },
    };

    // Apply the mutation
    await table.insert(data);

    console.log('NFT data inserted/updated successfully.');
  } catch (error) {
    console.error('Error inserting/updating NFT data:', error);
  }
};
