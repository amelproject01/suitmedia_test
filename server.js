const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/api/ideas', async (req, res) => {
  try {
    const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
      params: req.query,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
