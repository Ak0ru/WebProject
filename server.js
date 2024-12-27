const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

var app = express();
const port = 8881;
const USERS_DIR = path.join(__dirname, 'users');

const http = require("http");
const hostname = "127.0.0.1";

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files like HTML and CSS

// Ensure users directory exists
if (!fs.existsSync(USERS_DIR)) {
    fs.mkdirSync(USERS_DIR);
}

// Создаём HTTP-сервер
const server = http.createServer((req, res) => {
  
});

// API to save user data
app.get('/frontend/login.html', (req, res) => {
    const { email, password, tasks } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const userFile = path.join(USERS_DIR, `${email}.json`);

    // Check if user already exists
    if (fs.existsSync(userFile)) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    // Save user data
    const userData = { email, password, tasks };
    fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));

    res.status(201).json({ message: 'User created successfully.' });
});

// Start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
