const express = require('express');
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: 'John', age: 20 },
  { id: 2, name: 'Alice', age: 22 }
];


app.post('/students', (req, res) => {
  const { id, name, age } = req.body;
  students.push({ id, name, age });
  res.json({ message: 'Student added successfully', students });
});


app.get('/students', (req, res) => res.json(students));


app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  Object.assign(student, req.body);
  res.json({ message: 'Student updated successfully', student });
});


app.delete('/students/:id', (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ message: 'Student deleted successfully', students });
});

app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'));
