const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Crime_Report', (err, results) => {
    if(err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { crime_id, criminal_id, victim_id, status, remarks } = req.body;
  db.query('INSERT INTO Crime_Report (crime_id, criminal_id, victim_id, status, remarks) VALUES (?, ?, ?, ?, ?)',
    [crime_id, criminal_id, victim_id, status, remarks],
    (err, result) => {
      if(err) return res.status(500).json(err);
      res.json({ message: 'Crime Report added', id: result.insertId });
    });
});

module.exports = router;
