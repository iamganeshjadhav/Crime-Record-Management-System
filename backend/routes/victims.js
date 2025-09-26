const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Victim', (err, results) => {
    if(err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, age, gender, address } = req.body;
  db.query('INSERT INTO Victim (name, age, gender, address) VALUES (?, ?, ?, ?)',
    [name, age, gender, address],
    (err, result) => {
      if(err) return res.status(500).json(err);
      res.json({ message: 'Victim added', id: result.insertId });
    });
});

module.exports = router;
