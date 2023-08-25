import { Bigtable, Table } from '@google-cloud/bigtable';

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

export const insertNft = async (): Promise<void> => {
  try {
    // Get a reference to the table
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const nftRowKey = generateRowKey();

    const columnFamilyName = 'nft';

    // Create a mutation to insert or update data
    const data = {
      key: nftRowKey,
      data:{
        [columnFamilyName]: {
            positionX: 0,
            positionY: 1,
            imageIndex: 0,
        },
      }
    };

  
    await createFamilyIfNotExists(table, columnFamilyName)

    // Apply the mutation
    await table.insert(data);

    console.log('NFT data inserted/updated successfully.');
  } catch (error) {
    console.error('Error inserting/updating NFT data:', error);
  }
};



