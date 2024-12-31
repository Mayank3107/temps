const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Use CORS middleware to allow all origins (or configure it as needed)
app.use(cors());

// Example data structure for storing clipboard data with timestamps
let userClipboardData = {
    '221': [
        { clipboardData: 'clipboardData1', timestamp: '2024-12-31 12:00:00' },
        { clipboardData: 'clipboardData2', timestamp: '2024-12-31 12:05:00' }
    ],
    '222': [
        { clipboardData: 'clipboardData3', timestamp: '2024-12-31 12:10:00' }
    ]
    // Add other users here
};

// Endpoint to retrieve all users' clipboard data
app.get('/getClipboardData', (req, res) => {
    res.json(userClipboardData);  // Send the user clipboard data as JSON
});

// Endpoint for receiving clipboard data from the client
app.post('/upload', express.urlencoded({ extended: true }), (req, res) => {
    const { userId, clipboardData, timestamp } = req.body;
    
    // If the user does not exist, create a new array for them
    if (!userClipboardData[userId]) {
        userClipboardData[userId] = [];
    }
    
    // Add the clipboard data with timestamp for the user
    userClipboardData[userId].push({ clipboardData, timestamp });

    res.send('Data received');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
