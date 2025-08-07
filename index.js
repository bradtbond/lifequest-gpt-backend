// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/gpt', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: req.body.model || 'gpt-4',
      messages: req.body.messages,
      temperature: req.body.temperature || 0.7,
    });
    res.json(completion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'OpenAI API request failed.' });
  }
});

app.get('/', (req, res) => {
  res.send('LifeQuest GPT backend is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
