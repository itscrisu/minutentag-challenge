import { Router } from 'express';
import stockPrice from '../data/stock-price.js';

const router = Router();

router.get('/:sku', (req, res) => {
  const { sku } = req.params;
  const data = stockPrice[sku];

  if (!data) {
    return res.status(404).json({ error: `SKU "${sku}" not found` });
  }

  res.json(data);
});

export default router;
