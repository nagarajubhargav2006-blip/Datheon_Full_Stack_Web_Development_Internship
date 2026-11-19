const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const INDIA_MARKET_PRICES = {
  1: 2499,
  2: 699,
  3: 1899,
  4: 799,
  5: 14999,
  6: 8999,
  7: 11999,
  8: 599,
  9: 2299,
  10: 4499,
  11: 6499,
  12: 5999,
  13: 14999,
  14: 34999,
  15: 1599,
  16: 1299,
  17: 1699,
  18: 899,
  19: 599,
  20: 749
};

function applyIndianMarketPrice(product) {
  const mappedPrice =
    INDIA_MARKET_PRICES[product.id] ??
    Math.max(299, Math.round(Number(product.price) * 93));

  return {
    ...product,
    price: mappedPrice
  };
}

app.get('/api/products', async (_req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch products from FakeStoreAPI' });
    }
    const products = await response.json();
    const pricedProducts = products.map(applyIndianMarketPrice);
    res.json(pricedProducts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.post('/api/orders', (req, res) => {
  const { customer, items, totals } = req.body || {};

  if (!customer?.name || !customer?.email) {
    return res.status(400).json({ error: 'Customer name and email are required.' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart cannot be empty.' });
  }

  res.status(201).json({
    orderId: `ORD-${Date.now().toString().slice(-6)}`,
    customer,
    items,
    totals
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});