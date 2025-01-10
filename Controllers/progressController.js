// controllers/progressController.js
const db = require('../Config/db');

// Get all progress records
exports.getProgress = (req, res) => {
  const query = 'SELECT * FROM progress';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Add a progress record
exports.addProgress = (req, res) => {
  const { student_name, attendance, grades } = req.body;

  const query = 'INSERT INTO progress (student_name, attendance, grades) VALUES (?, ?, ?)';
  db.query(query, [student_name, attendance, grades], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Progress record added successfully.' });
  });
};
