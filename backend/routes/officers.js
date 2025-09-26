const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Police_Officer', (err, results) => {
    if(err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, officer_rank, station_id } = req.body;
  db.query('INSERT INTO Police_Officer (name, officer_rank, station_id) VALUES (?, ?, ?)',
    [name, officer_rank, station_id],
    (err, result) => {
      if(err) return res.status(500).json(err);
      res.json({ message: 'Officer added', id: result.insertId });
    });
});

module.exports = router;
