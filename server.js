const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    const messages = [
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: userMessage},
    ];
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        messages: messages,
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    res.json(response.data.choices[0].message.content);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
