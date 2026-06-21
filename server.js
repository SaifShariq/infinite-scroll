// Simple Express server to proxy Unsplash requests and keep the API key server-side.
// Requires Node 18+ (for global fetch) or install node-fetch and adjust accordingly.

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const UNSPLASH_KEY = process.env.UNSPLASH_API_KEY;

if (!UNSPLASH_KEY) {
  console.warn('Warning: UNSPLASH_API_KEY is not set. Set it in a .env file or in your environment.');
}

// Serve static files from public
app.use(express.static('public'));

// Proxy endpoint for fetching photos from Unsplash
app.get('/api/photos', async (req, res) => {
  const count = req.query.count || 20;
  try {
    const unsplashRes = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_KEY}&count=${count}`);
    if (!unsplashRes.ok) {
      const text = await unsplashRes.text();
      return res.status(unsplashRes.status).send(text);
    }
    const data = await unsplashRes.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching from Unsplash:', err);
    res.status(500).json({ error: 'Error fetching photos', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
