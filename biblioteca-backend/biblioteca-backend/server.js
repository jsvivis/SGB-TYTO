const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'library'
});

// Authentication route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret');
      res.json({ token, role: user.role });
    });
  });
});

// Middleware for protected routes
app.use(authMiddleware);

// Books routes
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/books', (req, res) => {
  const { title, author, year, isbn } = req.body;
  db.query('INSERT INTO books (title, author, year, isbn) VALUES (?, ?, ?, ?)', [title, author, year, isbn], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ title, author, year, isbn });
  });
});

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM books WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Book deleted' });
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
