const cors = require('cors');
import express from 'express';
import ProductRoutes from './routes/product.routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(ProductRoutes);

export default app;
