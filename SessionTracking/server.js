// sessionSimple.js
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

// Middleware setup
app.use(cookieParser());
app.use(session({
    secret: 'simple-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // session expires after 1 minute
}));

// Home route
app.get('/', (req, res) => {
    // Track page visits using session
    req.session.views = (req.session.views || 0) + 1;

    // Set a simple cookie if not already set
    if (!req.cookies.user) {
        res.cookie('user', 'Student', { maxAge: 60000 }); // 1 minute
    }

    // Display session and cookie info
    res.send(`
        <h3>Session & Cookie Tracking</h3>
        <p><b>Session ID:</b> ${req.sessionID}</p>
        <p><b>Visit Count:</b> ${req.session.views}</p>
        <p><b>Cookie (user):</b> ${req.cookies.user || 'Not set'}</p>
    `);
});

// Clear session and cookie
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('user');
        res.send('<p>Session destroyed and cookie cleared. <a href="/">Start new session</a></p>');
    });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
