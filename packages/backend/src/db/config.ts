export const instanceId = 'nft-db';
export const tableId = 'nft-table';
export const nftRowPrefix = 'NFT';
import { v4 as uuidv4 } from 'uuid';

export const generateRowKey = (): string =>  `${nftRowPrefix}#${uuidv4()}`
