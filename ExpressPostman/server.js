// Import modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory "database" (you can later replace this with MySQL or MongoDB)
let students = [
  { id: 1, name: 'John', age: 20 },
  { id: 2, name: 'Alice', age: 22 }
];

// --- CRUD APIs ---

// 1️⃣ CREATE: Add a new student
app.post('/students', (req, res) => {
  const { id, name, age } = req.body;
  if (!id || !name || !age) {
    return res.status(400).json({ message: 'Please provide id, name, and age' });
  }
  students.push({ id, name, age });
  res.status(201).json({ message: 'Student added successfully', students });
});

// 2️⃣ READ: Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// 3️⃣ READ ONE: Get student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.json(student);
});

// 4️⃣ UPDATE: Update student details
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  student.name = name || student.name;
  student.age = age || student.age;
  res.json({ message: 'Student updated successfully', student });
});

// 5️⃣ DELETE: Remove a student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: 'Student deleted successfully', students });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
