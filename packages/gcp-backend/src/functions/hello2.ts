import { Request, Response } from 'express';

export const hello2 = (_: Request, res: Response): void => {
  res.send('Hello from Cloud Function!');
};
