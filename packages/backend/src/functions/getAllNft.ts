import { Bigtable } from '@google-cloud/bigtable';

import { instanceId, nftRowPrefix, tableId } from 'db/config';
import { NftData } from 'types';
import { NftRowData, transformNftData } from 'utils/transformNftData';

const bigtable = new Bigtable();

export const getAllNft = async (): Promise<NftData[]> =>{
  return new Promise<NftData[]>((resolve, reject) => {
    try {
      const instance = bigtable.instance(instanceId);
      const table = instance.table(tableId);

      const stream = table.createReadStream({ prefix: nftRowPrefix });

      const nftDataArray: NftData[] = [];

      stream
        .on('error', (err: Error) => {
          console.log('Error streaming data from Bigtable:', err);
          reject(new Error('Internal Server Error'));
        })
        .on('data', (row: { data: NftRowData }) => {
          const nftData: NftRowData = row.data;
          nftDataArray.push(transformNftData(nftData));
        })
        .on('end', () => {
          console.log('All rows retrieved.');
          resolve(nftDataArray);
        });
    } catch (error) {
      console.error('Error fetching data from Bigtable:', error);
      reject(new Error('Internal Server Error'));
    }
  });
}
