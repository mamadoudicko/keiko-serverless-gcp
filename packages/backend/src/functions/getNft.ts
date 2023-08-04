import { Request, Response } from 'express';

export const getNft = (_: Request, res: Response): void => {
  console.log('getNft')
  res.send([]);
};
