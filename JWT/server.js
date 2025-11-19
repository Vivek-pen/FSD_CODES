// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

// === Simple "database" (in-memory) ===
const users = []; // { id, name, email, passwordHash }

// === Config (easy to remember) ===
const JWT_SECRET = "exam_secret_key"; // in real apps use env var
const TOKEN_EXP = "1h"; // token validity

// === Helpers ===
const createToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXP });

// === Middleware to protect routes ===
const authMiddleware = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'Missing Authorization header' });

  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Malformed token' });

  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid or expired token' });
    req.user = decoded; // attach decoded payload to request
    next();
  });
};

// === Routes ===

// Register: store user with hashed password
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password required' });

  // simple duplicate check
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already used' });

  const passwordHash = await bcrypt.hash(password, 8); // async
  const user = { id: users.length + 1, name, email, passwordHash };
  users.push(user);

  return res.json({ message: 'User registered', userId: user.id });
});

// Login: verify and return JWT
app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  // Include minimal claims; add role or other claims if needed
  const token = createToken({ id: user.id, email: user.email, name: user.name });
  return res.json({ message: 'Login successful', token });
});

// Protected endpoint
app.get('/profile', authMiddleware, (req, res) => {
  // req.user was set by middleware
  const { id, email, name } = req.user;
  // In real app, you might fetch fresh user info from DB
  res.json({ id, email, name, msg: 'This is a protected profile endpoint' });
});

// Simple public endpoint
app.get('/', (req, res) => res.send('JWT Demo Server is running'));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
