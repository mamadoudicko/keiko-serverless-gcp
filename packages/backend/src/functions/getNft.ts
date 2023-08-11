import { Bigtable } from '@google-cloud/bigtable';
import { Request, Response } from 'express';

import { instanceId, nftRowKey, tableId } from 'db/config';

// Initialize the Bigtable client
const bigtable = new Bigtable();

// Specify your instance and table name

export const getNft = async (_: Request, res: Response): Promise<void> => {
  try {
    console.log('getNft');

    // Get a reference to the table
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const [rowExists] = await table.row(nftRowKey).exists();

    if (!rowExists) {
      res.send([]);

      return;
    }

    // Define the row key or other query parameters

    // Fetch the data from Cloud Bigtable
    const [row] = await table.row(nftRowKey).get();

    // Process the fetched data and send response
    if (row.data !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const nftData = row.data;
      res.send(nftData);
    } else {
      res.send([]);
    }
  } catch (error) {
    console.error('Error fetching data from Bigtable:', error);
    res.status(500).send('Internal Server Error');
  }
};
