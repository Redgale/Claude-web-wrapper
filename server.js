const express = require('express');
const cors = require('cors');
const { puter } = require('@heyputer/puter.js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve the frontend interface from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt, model = 'claude-sonnet-4-6' } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'A prompt is required.' });
        }

        console.log(`Sending request to Puter using model: ${model}...`);
        const response = await puter.ai.chat(prompt, { model });

        res.json({
            success: true,
            model: model,
            reply: response.message.content[0].text
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: 'Failed to generate response.' });
    }
});

app.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`);
});
