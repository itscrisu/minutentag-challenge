import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import stockPriceRouter from './routes/stockPrice.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/stock-price', stockPriceRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
