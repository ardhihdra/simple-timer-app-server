const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logTimer = require('./models/logTimer'); 
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (replace 'your_mongo_uri' with your actual MongoDB URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// GET /logs
app.get('/logs', async (req, res) => {
    try {
        const email = req.query.email;
        const logs = await logTimer.find({ email: email });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /logs
app.post('/logs', async (req, res) => {
    try {
        const { email, startTime, endTime, duration, notes } = req.body;
        const newLog = await logTimer.create({ email, startTime, endTime, duration, notes });
        res.status(201).json(newLog);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3099;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});