import { Bigtable, Table } from '@google-cloud/bigtable';

import { generateRowKey, instanceId, tableId } from 'db/config';

const bigtable = new Bigtable();

const createFamilyIfNotExists = async (table: Table, columnFamilyName: string): Promise<void> => {
  const [metadata] = await table.getMetadata();
  const columnFamilyExists = metadata.columnFamilies[columnFamilyName] !== undefined;
  if (!columnFamilyExists) {
    await table.createFamily(columnFamilyName);
  }
};

export type CreateNftInput = {
  positionX: number;
  positionY: number;
  imageIndex: number;
};

export const insertNft = async (input: CreateNftInput): Promise<string> => {
  try {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const nftRowKey = generateRowKey(); // You need to define or import generateRowKey()

    const columnFamilyName = 'nft';

    const data = {
      key: nftRowKey,
      data: {
        [columnFamilyName]: {
          positionX: input.positionX,
          positionY: input.positionY,
          imageIndex: input.imageIndex,
        },
      },
    };

    await createFamilyIfNotExists(table, columnFamilyName);

    await table.insert(data);

    return 'NFT data inserted/updated successfully.';
  } catch (error) {
    console.error('Error inserting/updating NFT data:', error);
    throw new Error('Internal Server Error');
  }
}


