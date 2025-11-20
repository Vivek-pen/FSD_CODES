const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());

let users = [];
const KEY = "key";

// Register
app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  const hash = await bcrypt.hash(password, 8);
  users.push({name, email, hash});
  res.json({msg:"registered"});
});

// Login
app.post('/login', async (req, res) => {
  const u = users.find(x => x.email === req.body.email);
  if (!u) return res.json({msg:"invalid"});
  const ok = await bcrypt.compare(req.body.password, u.hash);
  if (!ok) return res.json({msg:"invalid"});
  const token = jwt.sign({email:u.email}, KEY, {expiresIn:"1h"});
  res.json({token});
});

// Protected
app.get('/profile', (req, res) => {
  try{
    const t = req.headers.authorization?.split(" ")[1];
    const data = jwt.verify(t, KEY);
    res.json({email:data.email, msg:"protected"});
  }catch(e){ res.json({msg:"no/invalid token"}); }
});

app.listen(3000);
