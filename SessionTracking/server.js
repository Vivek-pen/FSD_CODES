const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.cookie('user', 'Student', { maxAge: 60000 });
  res.send(`
    <h3>Session & Cookie Tracking</h3>
    <p><b>Session ID:</b> ${req.sessionID}</p>
    <p><b>Visit Count:</b> ${req.session.views}</p>
    <p><b>Cookie (user):</b> Student</p>
  `);
});

app.listen(3000, () => console.log('http://localhost:3000'));
