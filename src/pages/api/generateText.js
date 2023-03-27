// pages/api/generateText.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userInput } = req.body;

    try {
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: `You are an AI that helps users play a text-based adventure game. The user input is: "${userInput}".\n\nGame Response:`,
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 1.0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const aiResponse = openaiResponse.data.choices[0].text.trim();
      res.status(200).json({ aiResponse });
    } catch (error) {
      console.error('Error generating text:', error);
      res.status(500).json({ error: 'Failed to generate text' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
