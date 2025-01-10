// controllers/meetingController.js
const db = require('../Config/db');

// Schedule a meeting
exports.scheduleMeeting = (req, res) => {
  const { teacher_id, parent_id, date, description } = req.body;

  const query = 'INSERT INTO meetings (teacher_id, parent_id, date, description) VALUES (?, ?, ?, ?)';
  db.query(query, [teacher_id, parent_id, date, description], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Meeting scheduled successfully.' });
  });
};

// Get all meetings
exports.getMeetings = (req, res) => {
  const query = `
    SELECT meetings.*, 
           teachers.username AS teacher_name, 
           parents.username AS parent_name 
    FROM meetings
    JOIN users AS teachers ON meetings.teacher_id = teachers.id
    JOIN users AS parents ON meetings.parent_id = parents.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
