// controllers/messageController.js
const db = require('../Config/db');

// Send a message
exports.sendMessage = (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  const query = 'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)';
  db.query(query, [sender_id, receiver_id, content], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Message sent successfully.' });
  });
};

// Get messages for a user
exports.getMessages = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT * FROM messages
    WHERE sender_id = ? OR receiver_id = ?
    ORDER BY timestamp DESC
  `;
  db.query(query, [userId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
