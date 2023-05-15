import { Router } from 'express';
import ProductController from '../controler/products';
import {validateProducts} from '../middleware/validate.products';

const router = Router();
const productController = new ProductController();

router.post('/products', validateProducts, productController.getValidation);
router.put('/update', productController.update);

export default router;