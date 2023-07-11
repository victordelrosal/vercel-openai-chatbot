const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: prompt,
        max_tokens: 150,
    }, {
        headers: {
            'Authorization': `Bearer YOUR_OPENAI_SECRET_KEY`,
            'Content-Type': 'application/json'
        }
    });
    res.json(response.data.choices[0].text.trim());
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
