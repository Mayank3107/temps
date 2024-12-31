const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Use CORS middleware to allow all origins (or configure as needed)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example data structure for storing clipboard data with timestamps
let userClipboardData = {
    '221': [
        { clipboardData: 'clipboardData1', timestamp: '2024-12-31 12:00:00' },
        { clipboardData: 'clipboardData2', timestamp: '2024-12-31 12:05:00' }
    ],
    '222': [
        { clipboardData: 'clipboardData3', timestamp: '2024-12-31 12:10:00' }
    ]
};

// Endpoint to retrieve all users' clipboard data
app.get('/getClipboardData', (req, res) => {
    res.json(userClipboardData);
});

// Endpoint for receiving clipboard data from the client
app.post('/upload', (req, res) => {
    const { userId, clipboardData, timestamp } = req.body;
    
    if (!userClipboardData[userId]) {
        userClipboardData[userId] = [];
    }
    userClipboardData[userId].push({ clipboardData, timestamp });

    res.send('Data received');
});

// Endpoint to delete entire user data
app.delete('/deleteUser', (req, res) => {
    const { userId } = req.query;

    if (userClipboardData[userId]) {
        delete userClipboardData[userId];
        res.send(`User ${userId} deleted successfully.`);
    } else {
        res.status(404).send('User not found.');
    }
});

// Endpoint to delete individual clipboard entry
app.delete('/deleteEntry', (req, res) => {
    const { userId, index } = req.query;

    if (userClipboardData[userId] && userClipboardData[userId][index]) {
        userClipboardData[userId].splice(index, 1);
        res.send(`Entry ${index} for user ${userId} deleted successfully.`);
    } else {
        res.status(404).send('Entry not found.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
