import { Request, Response } from 'express';

export const hello = (_: Request, res: Response): void => {
  res.send('Hello from Cloud Function!');
};
