const express = require('express');
const app = express();
const port = 5000; // You can change this port if needed

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
