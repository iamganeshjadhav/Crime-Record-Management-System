const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Criminal', (err, results) => {
    if(err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, age, gender, address, crime_history } = req.body;
  db.query('INSERT INTO Criminal (name, age, gender, address, crime_history) VALUES (?, ?, ?, ?, ?)',
    [name, age, gender, address, crime_history],
    (err, result) => {
      if(err) return res.status(500).json(err);
      res.json({ message: 'Criminal added', id: result.insertId });
    });
});

module.exports = router;
