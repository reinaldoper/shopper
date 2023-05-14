import { Request, Response, NextFunction } from 'express';
import statusCodes from '../statusCodes';

const validateProducts = async (req: Request, res: Response, next: NextFunction) => {
  const updates = req.body;
  if (!Array.isArray(updates)) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: 'O arquivo CSV deve conter um array de objetos.' });
  }
  const invalidUpdates = updates.filter(
    (update) =>
      !update.hasOwnProperty('product_code') ||
      !update.hasOwnProperty('new_price') ||
      typeof update.product_code !== 'number' ||
      typeof update.new_price !== 'number'
  );
  if (invalidUpdates.length > 0) {
    return res.status(statusCodes.BAD_REQUEST).json({ error: 'O arquivo CSV contém dados inválidos.' });
  }
  next();
};

export default validateProducts;
