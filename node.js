// Node.js example (app.js)
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const API_KEY = '6430fbcaddf745c5826737bcd7744671';
const PORT = process.env.PORT || 3000;

app.get('/news', async (req, res) => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
