import { NftData } from "types";

export type NftRowData = {
  nft: {
    imageIndex: Array<{ value: number; labels: string[]; timestamp: string }>;
    positionX: Array<{ value: number; labels: string[]; timestamp: string }>;
    positionY: Array<{ value: number; labels: string[]; timestamp: string }>;
  };
};

export const transformNftData = (input: NftRowData): NftData => {
  const output: NftData = {
    imageIndex: 0,
    positionX: 0,
    positionY: 0,
  };

  for (const key in input.nft) {
    if (Object.prototype.hasOwnProperty.call(input.nft, key)) {
      const value = input.nft[key as keyof typeof input.nft][0]?.value;
      if (value !== undefined) {
        output[key as keyof NftData] = value;
      }
    }
  }

  return output;
};
