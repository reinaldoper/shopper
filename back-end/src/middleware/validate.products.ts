import { Request, Response, NextFunction } from 'express';
import statusCodes from '../statusCodes';

export const validateProducts = async (req: Request, res: Response, next: NextFunction) => {
  const updates = req.body;
  if (!Array.isArray(updates)) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: 'O arquivo CSV deve conter um array de objetos.' });
  }
  next();
};


